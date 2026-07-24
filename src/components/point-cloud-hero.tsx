import { useEffect, useRef, useState, useContext } from "react";
import { motion, useSpring, useMotionValueEvent, useReducedMotion } from "framer-motion";
import { useIntensity } from "./chrono";

// To use the real scan: run decimate_pointcloud.py on the .xyz, upload the
// output to public/aircraft.pcbin, and change CLOUD_SRC to "/aircraft.pcbin".
// Same NRPC format — no code change needed.
const CLOUD_SRC = "/aircraft-placeholder.pcbin";

type ParsedCloud = {
  count: number;
  positions: Float32Array;
  colors: Float32Array;
};

export function parsePcbin(buf: ArrayBuffer): ParsedCloud {
  const view = new DataView(buf);
  const magic = String.fromCharCode(view.getUint8(0), view.getUint8(1), view.getUint8(2), view.getUint8(3));
  if (magic !== "NRPC") throw new Error("Invalid pcbin magic");
  const N = view.getUint32(4, true);
  const positions = new Float32Array(N * 3);
  const colors = new Float32Array(N * 3);
  let off = 8;
  for (let i = 0; i < N; i++) {
    positions[i * 3] = view.getFloat32(off, true); off += 4;
    positions[i * 3 + 1] = view.getFloat32(off, true); off += 4;
    positions[i * 3 + 2] = view.getFloat32(off, true); off += 4;
    colors[i * 3] = view.getUint8(off++) / 255;
    colors[i * 3 + 1] = view.getUint8(off++) / 255;
    colors[i * 3 + 2] = view.getUint8(off++) / 255;
  }
  return { count: N, positions, colors };
}

const VERT = /* glsl */ `
  attribute vec3 aColor;
  attribute vec3 aRand;
  attribute float aSeed;
  uniform float uDisperse;
  uniform float uIntensity;
  uniform float uAssemble;
  uniform vec2 uMouse;
  uniform float uMouseStrength;
  uniform float uSize;
  uniform float uTime;
  varying vec3 vColor;
  varying float vHeight;
  varying float vMouseProx;
  varying float vScanGlow;
  uniform float uScan;
  void main() {
    vec3 scattered = position + aRand * 3.0;
    vec3 base = mix(scattered, position, clamp(uAssemble, 0.0, 1.0));
    vec3 disp = base + aRand * uDisperse * 1.2;
    vec4 mv = modelViewMatrix * vec4(disp, 1.0);
    vec4 proj = projectionMatrix * mv;
    // ndc for mouse proximity
    vec2 ndc = proj.xy / proj.w;
    float d = distance(ndc, uMouse);
    float prox = smoothstep(0.35, 0.0, d) * uMouseStrength;
    vMouseProx = prox;
    vHeight = disp.y;
    vColor = aColor;
    // scanner sweep — thin band around uScan on x axis
    float band = smoothstep(0.08, 0.0, abs(disp.x - uScan));
    vScanGlow = band;
    float sizeAtten = 300.0 / -mv.z;
    gl_PointSize = uSize * (1.0 + uIntensity * 0.6 + prox * 1.6 + band * 0.8) * sizeAtten;
    gl_Position = proj;
  }
`;

const FRAG = /* glsl */ `
  precision mediump float;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform float uIntensity;
  varying vec3 vColor;
  varying float vHeight;
  varying float vMouseProx;
  varying float vScanGlow;
  void main() {
    vec2 c = gl_PointCoord - vec2(0.5);
    float r = length(c);
    if (r > 0.5) discard;
    float soft = smoothstep(0.5, 0.15, r);
    vec3 tint = mix(uColorA, uColorB, clamp(uIntensity, 0.0, 1.0));
    vec3 base = mix(vColor, tint, 0.5);
    // subtle height-based emerald wash
    base = mix(base, uColorA, clamp((vHeight + 0.3) * 0.35, 0.0, 0.4));
    // mouse lift + scan glow (additive)
    base += uColorA * (vMouseProx * 0.4 + vScanGlow * 0.9);
    gl_FragColor = vec4(base, 0.9 * soft);
  }
`;

type Props = {
  className?: string;
  /** decimation factor for coarse devices (2 = every other point) */
  decimate?: number;
  /** point size multiplier */
  sizeScale?: number;
};

// Safe intensity hook — returns null if not inside provider.
function useOptionalIntensity() {
  try {
    return useIntensity();
  } catch {
    return null;
  }
}

export function PointCloudHero({ className, decimate, sizeScale = 1 }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [inView, setInView] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  const reducedMotion = !!useReducedMotion();
  const ctx = useOptionalIntensity();

  // Spring-smoothed intensity driver (0..1).
  const intensitySpring = useSpring(0, { stiffness: 60, damping: 20 });
  useMotionValueEvent(ctx?.intensity ?? intensitySpring, "change", (v) => {
    intensitySpring.set(v);
  });

  // Observe entry into viewport (mount canvas only when in view).
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") { setInView(true); return; }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) setInView(e.isIntersecting);
      },
      { rootMargin: "200px 0px", threshold: 0.01 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Mount three scene when in view.
  useEffect(() => {
    if (!inView) return;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let disposed = false;
    let rafId = 0;
    let cleanup = () => {};

    (async () => {
      let THREE: typeof import("three");
      try {
        THREE = await import("three");
      } catch {
        if (!disposed) setFailed(true);
        return;
      }

      // Check WebGL availability.
      const testCtx = canvas.getContext("webgl2") || canvas.getContext("webgl");
      if (!testCtx) { if (!disposed) setFailed(true); return; }

      // Fetch and parse cloud.
      let cloud: ParsedCloud;
      try {
        const res = await fetch(CLOUD_SRC);
        if (!res.ok) throw new Error("fetch failed");
        const ab = await res.arrayBuffer();
        cloud = parsePcbin(ab);
      } catch {
        if (!disposed) setFailed(true);
        return;
      }
      if (disposed) return;

      // Optional decimation for coarse devices.
      const isCoarse = window.matchMedia("(pointer: coarse)").matches;
      const isSmall = window.innerWidth < 768;
      const dec = decimate ?? (isSmall ? 2 : 1);
      const N = Math.floor(cloud.count / dec);
      const positions = new Float32Array(N * 3);
      const colors = new Float32Array(N * 3);
      const rand = new Float32Array(N * 3);
      const seed = new Float32Array(N);
      for (let i = 0; i < N; i++) {
        const src = i * dec;
        positions[i * 3] = cloud.positions[src * 3];
        positions[i * 3 + 1] = cloud.positions[src * 3 + 1];
        positions[i * 3 + 2] = cloud.positions[src * 3 + 2];
        colors[i * 3] = cloud.colors[src * 3];
        colors[i * 3 + 1] = cloud.colors[src * 3 + 1];
        colors[i * 3 + 2] = cloud.colors[src * 3 + 2];
        // unit-ish direction
        const rx = Math.random() * 2 - 1;
        const ry = Math.random() * 2 - 1;
        const rz = Math.random() * 2 - 1;
        const l = Math.hypot(rx, ry, rz) || 1;
        rand[i * 3] = rx / l;
        rand[i * 3 + 1] = ry / l;
        rand[i * 3 + 2] = rz / l;
        seed[i] = Math.random();
      }

      const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: false,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      const rect = container.getBoundingClientRect();
      renderer.setSize(rect.width, rect.height, false);
      renderer.setClearColor(0x000000, 0);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, rect.width / rect.height, 0.1, 100);
      camera.position.set(0, 0.15, 2.6);
      camera.lookAt(0, 0, 0);

      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geo.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));
      geo.setAttribute("aRand", new THREE.BufferAttribute(rand, 3));
      geo.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));

      const uniforms = {
        uDisperse: { value: 0 },
        uIntensity: { value: 0 },
        uAssemble: { value: reducedMotion ? 1 : 0 },
        uMouse: { value: new THREE.Vector2(2, 2) },
        uMouseStrength: { value: isCoarse ? 0 : 1 },
        uSize: { value: (isSmall ? 1.6 : 2.0) * sizeScale },
        uTime: { value: 0 },
        uScan: { value: -1 },
        uColorA: { value: new THREE.Color(0.20, 0.83, 0.60) }, // emerald
        uColorB: { value: new THREE.Color(0.13, 0.83, 0.93) }, // cyan
      };

      const mat = new THREE.ShaderMaterial({
        uniforms,
        vertexShader: VERT,
        fragmentShader: FRAG,
        transparent: true,
        depthWrite: false,
        blending: THREE.NormalBlending,
      });

      const points = new THREE.Points(geo, mat);
      scene.add(points);

      // Pointer tracking
      const onMove = (e: PointerEvent) => {
        if (isCoarse) return;
        const r = container.getBoundingClientRect();
        const nx = ((e.clientX - r.left) / r.width) * 2 - 1;
        const ny = -(((e.clientY - r.top) / r.height) * 2 - 1);
        uniforms.uMouse.value.set(nx, ny);
      };
      const onLeave = () => uniforms.uMouse.value.set(2, 2);
      container.addEventListener("pointermove", onMove);
      container.addEventListener("pointerleave", onLeave);

      // Resize
      const onResize = () => {
        const r = container.getBoundingClientRect();
        renderer.setSize(r.width, r.height, false);
        camera.aspect = r.width / r.height;
        camera.updateProjectionMatrix();
      };
      const ro = new ResizeObserver(onResize);
      ro.observe(container);

      // Visibility pause
      let visible = true;
      const onVis = () => { visible = !document.hidden; if (visible && !rafId && !reducedMotion) loop(); };
      document.addEventListener("visibilitychange", onVis);

      // Offscreen pause via IntersectionObserver on container
      let onscreen = true;
      const io2 = new IntersectionObserver(
        (entries) => {
          for (const e of entries) onscreen = e.isIntersecting;
          if (onscreen && !rafId && !reducedMotion) loop();
        },
        { threshold: 0.01 }
      );
      io2.observe(container);

      // Assemble animation
      const start = performance.now();
      const ASSEMBLE_MS = 2200;

      const loop = () => {
        rafId = 0;
        if (disposed) return;
        if (!visible || !onscreen) return;
        const t = (performance.now() - start) / 1000;
        uniforms.uTime.value = t;
        if (!reducedMotion) {
          // assemble ease-out
          const a = Math.min(1, (t * 1000) / ASSEMBLE_MS);
          uniforms.uAssemble.value = 1 - Math.pow(1 - a, 3);
          // scanner loop 6s
          uniforms.uScan.value = -1 + ((t % 6) / 6) * 2;
          // slow yaw
          points.rotation.y = t * 0.08;
          // scroll intensity → disperse/color
          const iv = intensitySpring.get();
          uniforms.uIntensity.value = iv;
          uniforms.uDisperse.value = iv * 0.6;
        }
        renderer.render(scene, camera);
        if (!reducedMotion) rafId = requestAnimationFrame(loop);
      };

      if (reducedMotion) {
        uniforms.uAssemble.value = 1;
        renderer.render(scene, camera);
      } else {
        rafId = requestAnimationFrame(loop);
      }
      setReady(true);

      cleanup = () => {
        if (rafId) cancelAnimationFrame(rafId);
        container.removeEventListener("pointermove", onMove);
        container.removeEventListener("pointerleave", onLeave);
        document.removeEventListener("visibilitychange", onVis);
        ro.disconnect();
        io2.disconnect();
        geo.dispose();
        mat.dispose();
        renderer.dispose();
      };
    })();

    return () => {
      disposed = true;
      cleanup();
    };
  }, [inView, reducedMotion, decimate, sizeScale, intensitySpring]);

  return (
    <div ref={containerRef} className={className ?? "relative w-full h-full"}>
      {/* Poster fallback — visible until the scene is ready or if WebGL failed */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 55%, rgba(52,211,153,0.10), transparent 60%), radial-gradient(ellipse at 30% 40%, rgba(34,211,238,0.06), transparent 70%), #05070a",
          opacity: ready && !failed ? 0 : 1,
          transition: "opacity 500ms ease",
        }}
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
        style={{ opacity: failed ? 0 : 1 }}
      />
      <motion.div
        className="absolute left-4 md:left-8 bottom-4 md:bottom-6 font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase text-emerald-300/80 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        Scan-verified geometry · 150,000 points
      </motion.div>
    </div>
  );
}
