import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useMotionValueEvent, useReducedMotion } from "framer-motion";
import { useIntensity } from "./chrono";

// To use the real scan: run decimate_pointcloud.py on the .xyz, upload the
// output to public/aircraft.pcbin, and change CLOUD_SRC to "/aircraft.pcbin".
// Same NRPC format — no code change needed.
const CLOUD_SRC = "/aircraft.pcbin";

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

type Props = {
  className?: string;
  /** decimation factor for coarse devices (2 = every other point) */
  decimate?: number;
  /** point size multiplier */
  sizeScale?: number;
  /** horizontal offset in units of bounding-sphere radius (desktop only) */
  offsetX?: number;
};

function useOptionalIntensity() {
  try {
    return useIntensity();
  } catch {
    return null;
  }
}

export function PointCloudHero({ className, decimate, sizeScale = 1, offsetX = 0 }: Props) {

  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [inView, setInView] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  const reducedMotion = !!useReducedMotion();
  const ctx = useOptionalIntensity();

  const intensitySpring = useSpring(0, { stiffness: 60, damping: 20 });
  useMotionValueEvent(ctx?.intensity ?? intensitySpring, "change", (v) => {
    intensitySpring.set(v);
  });

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

      const isSmall = window.innerWidth < 768;
      const dec = decimate ?? (isSmall ? 2 : 1);
      const N = Math.floor(cloud.count / dec);
      const target = new Float32Array(N * 3);
      const scattered = new Float32Array(N * 3);
      const colors = new Float32Array(N * 3);

      // First pass: copy positions to compute bounds for height-based tinting.
      let minY = Infinity, maxY = -Infinity;
      for (let i = 0; i < N; i++) {
        const src = i * dec;
        const x = cloud.positions[src * 3];
        const y = cloud.positions[src * 3 + 1];
        const z = cloud.positions[src * 3 + 2];
        target[i * 3] = x;
        target[i * 3 + 1] = y;
        target[i * 3 + 2] = z;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
      const yRange = maxY - minY || 1;

      const emerald = { r: 0.20, g: 0.83, b: 0.60 };
      for (let i = 0; i < N; i++) {
        const src = i * dec;
        const r = cloud.colors[src * 3];
        const g = cloud.colors[src * 3 + 1];
        const b = cloud.colors[src * 3 + 2];
        const hNorm = (target[i * 3 + 1] - minY) / yRange; // 0..1
        const mix = 0.35 * hNorm;
        colors[i * 3] = Math.min(1, r * (1 - mix) + emerald.r * mix + 0.06);
        colors[i * 3 + 1] = Math.min(1, g * (1 - mix) + emerald.g * mix + 0.06);
        colors[i * 3 + 2] = Math.min(1, b * (1 - mix) + emerald.b * mix + 0.06);

        // scattered start position
        const rx = Math.random() * 2 - 1;
        const ry = Math.random() * 2 - 1;
        const rz = Math.random() * 2 - 1;
        const l = Math.hypot(rx, ry, rz) || 1;
        scattered[i * 3] = target[i * 3] + (rx / l) * 1.4;
        scattered[i * 3 + 1] = target[i * 3 + 1] + (ry / l) * 1.4;
        scattered[i * 3 + 2] = target[i * 3 + 2] + (rz / l) * 1.4;
      }

      let renderer: import("three").WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({
          canvas,
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
        });
      } catch (e) {
        console.error("PointCloud WebGL init failed", e);
        if (!disposed) setFailed(true);
        return;
      }

      try {
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        const rect = container.getBoundingClientRect();
        renderer.setSize(rect.width, rect.height, false);
        renderer.setClearColor(0x000000, 0);

        const scene = new THREE.Scene();

        // Initial live positions: scattered (or target if reducedMotion).
        const live = new Float32Array(N * 3);
        if (reducedMotion) {
          live.set(target);
        } else {
          live.set(scattered);
        }

        const geo = new THREE.BufferGeometry();
        const posAttr = new THREE.BufferAttribute(live, 3);
        geo.setAttribute("position", posAttr);
        geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

        // Auto-frame: use target for bounds, translate live+target so centroid at origin.
        const tmpGeo = new THREE.BufferGeometry();
        tmpGeo.setAttribute("position", new THREE.BufferAttribute(target.slice(), 3));
        tmpGeo.computeBoundingSphere();
        const R = tmpGeo.boundingSphere ? tmpGeo.boundingSphere.radius : 1;
        const c = tmpGeo.boundingSphere ? tmpGeo.boundingSphere.center : new THREE.Vector3();
        // translate all buffers
        for (let i = 0; i < N; i++) {
          target[i * 3] -= c.x; target[i * 3 + 1] -= c.y; target[i * 3 + 2] -= c.z;
          scattered[i * 3] -= c.x; scattered[i * 3 + 1] -= c.y; scattered[i * 3 + 2] -= c.z;
          live[i * 3] -= c.x; live[i * 3 + 1] -= c.y; live[i * 3 + 2] -= c.z;
        }
        posAttr.needsUpdate = true;
        tmpGeo.dispose();

        const fov = 45;
        const dist = (R / Math.sin((fov * Math.PI) / 180 / 2)) * 1.25;
        const camera = new THREE.PerspectiveCamera(fov, rect.width / rect.height, 0.01, dist * 10);
        camera.position.set(dist * 0.5, dist * 0.3, dist * 0.9);
        camera.lookAt(0, 0, 0);

        const baseSize = 0.011 * sizeScale;
        const mat = new THREE.PointsMaterial({
          size: baseSize,
          vertexColors: true,
          transparent: true,
          opacity: 0.95,
          sizeAttenuation: true,
          depthWrite: false,
        });

        const points = new THREE.Points(geo, mat);
        points.position.x = isSmall ? 0 : offsetX * R;
        scene.add(points);
        renderer.render(scene, camera);
        console.log("[PointCloud] mounted, points:", N);
        console.log("[PointCloud] first frame rendered");

        const onResize = () => {
          const r = container.getBoundingClientRect();
          renderer.setSize(r.width, r.height, false);
          camera.aspect = r.width / r.height;
          camera.updateProjectionMatrix();
          renderer.render(scene, camera);
        };
        const ro = new ResizeObserver(onResize);
        ro.observe(container);

        let visible = true;
        const onVis = () => { visible = !document.hidden; if (visible && !rafId && !reducedMotion) loop(); };
        document.addEventListener("visibilitychange", onVis);

        let onscreen = true;
        const io2 = new IntersectionObserver(
          (entries) => {
            for (const e of entries) onscreen = e.isIntersecting;
            if (onscreen && !rafId && !reducedMotion) loop();
          },
          { threshold: 0.01 }
        );
        io2.observe(container);

        const start = performance.now();
        const ASSEMBLE_MS = 2200;
        let assembled = false;

        const loop = () => {
          rafId = 0;
          if (disposed) return;
          if (!visible || !onscreen) return;
          const t = (performance.now() - start) / 1000;

          if (!assembled) {
            const a = Math.min(1, (t * 1000) / ASSEMBLE_MS);
            const eased = 1 - Math.pow(1 - a, 3);
            for (let i = 0; i < N; i++) {
              const i3 = i * 3;
              live[i3] = scattered[i3] + (target[i3] - scattered[i3]) * eased;
              live[i3 + 1] = scattered[i3 + 1] + (target[i3 + 1] - scattered[i3 + 1]) * eased;
              live[i3 + 2] = scattered[i3 + 2] + (target[i3 + 2] - scattered[i3 + 2]) * eased;
            }
            posAttr.needsUpdate = true;
            if (a >= 1) assembled = true;
          }

          const iv = intensitySpring.get();
          mat.size = baseSize * (1 + iv * 0.8);
          mat.opacity = 0.95 - iv * 0.35;
          points.rotation.y = t * (0.06 + iv * 0.25);

          renderer.render(scene, camera);
          rafId = requestAnimationFrame(loop);
        };

        if (reducedMotion) {
          renderer.render(scene, camera);
        } else {
          rafId = requestAnimationFrame(loop);
        }
        setReady(true);

        cleanup = () => {
          if (rafId) cancelAnimationFrame(rafId);
          document.removeEventListener("visibilitychange", onVis);
          ro.disconnect();
          io2.disconnect();
          geo.dispose();
          mat.dispose();
          renderer.dispose();
        };
      } catch (e) {
        console.error("PointCloud scene setup failed", e);
        if (!disposed) setFailed(true);
        return;
      }
    })();

    return () => {
      disposed = true;
      cleanup();
    };
  }, [inView, reducedMotion, decimate, sizeScale, offsetX, intensitySpring]);

  return (
    <div ref={containerRef} className={className ?? "relative w-full h-full"}>
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
        Live preview · placeholder scan — real capture drops in on launch
      </motion.div>
    </div>
  );
}
