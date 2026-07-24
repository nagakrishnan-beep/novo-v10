// Generate a placeholder point cloud in NRPC format.
// Layout: 4-byte "NRPC" magic, uint32 LE point count, then N records of
// (float32 x, float32 y, float32 z, uint8 r, uint8 g, uint8 b).
//
// Procedural shape: a stylised aircraft cabin — half-tube fuselage shell,
// floor strip, and seat-block rows. Coordinates are pre-centered and scaled
// so the model fits roughly a unit box (~ -1..1).

import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, "../public/aircraft-placeholder.pcbin");

const TARGET = 150_000;
const points = []; // {x,y,z,r,g,b}

// Fuselage: half-tube shell (top half + a bit) along X axis.
const fuselageCount = Math.floor(TARGET * 0.55);
const LEN = 1.9;  // along X
const R = 0.42;   // radius
for (let i = 0; i < fuselageCount; i++) {
  const x = (Math.random() - 0.5) * LEN;
  // theta biased to upper half (−0.25π .. 1.25π)
  const theta = -Math.PI * 0.25 + Math.random() * Math.PI * 1.5;
  const jitter = 1 + (Math.random() - 0.5) * 0.02;
  const y = Math.sin(theta) * R * jitter;
  const z = Math.cos(theta) * R * jitter;
  const g = 150 + Math.floor(Math.random() * 60); // 150..210
  points.push({ x, y, z, r: g, g: g, b: g });
}

// Floor strip
const floorCount = Math.floor(TARGET * 0.10);
for (let i = 0; i < floorCount; i++) {
  const x = (Math.random() - 0.5) * LEN;
  const z = (Math.random() - 0.5) * 0.5;
  const y = -R * 0.55 + (Math.random() - 0.5) * 0.01;
  const g = 160 + Math.floor(Math.random() * 40);
  points.push({ x, y, z, r: g, g, b: g });
}

// Seat rows (emerald accents). 10 rows, 2+2 blocks per row.
const seatCount = TARGET - points.length; // remaining ~20%
const rows = 10;
const perRow = Math.floor(seatCount / rows);
const emerald = { r: 52, g: 211, b: 153 };
for (let row = 0; row < rows; row++) {
  const xCenter = -LEN * 0.42 + (row / (rows - 1)) * LEN * 0.84;
  for (let i = 0; i < perRow; i++) {
    // pick left or right block
    const side = Math.random() < 0.5 ? -1 : 1;
    const zBlock = side * (0.12 + Math.random() * 0.14);
    const x = xCenter + (Math.random() - 0.5) * 0.11;
    const y = -R * 0.5 + Math.random() * 0.28; // seat + backrest height
    const z = zBlock + (Math.random() - 0.5) * 0.02;
    // ~20% overall emerald: seat rows are all accent
    const tint = 0.85 + Math.random() * 0.15;
    points.push({
      x, y, z,
      r: Math.floor(emerald.r * tint),
      g: Math.floor(emerald.g * tint),
      b: Math.floor(emerald.b * tint),
    });
  }
}

// Recenter on centroid, scale to unit box.
let cx = 0, cy = 0, cz = 0;
for (const p of points) { cx += p.x; cy += p.y; cz += p.z; }
cx /= points.length; cy /= points.length; cz /= points.length;
let maxAbs = 0;
for (const p of points) {
  p.x -= cx; p.y -= cy; p.z -= cz;
  maxAbs = Math.max(maxAbs, Math.abs(p.x), Math.abs(p.y), Math.abs(p.z));
}
const scale = maxAbs > 0 ? 1 / maxAbs : 1;
for (const p of points) { p.x *= scale; p.y *= scale; p.z *= scale; }

const N = points.length;
const buf = Buffer.alloc(8 + N * 15);
buf.write("NRPC", 0, "ascii");
buf.writeUInt32LE(N, 4);
let off = 8;
for (const p of points) {
  buf.writeFloatLE(p.x, off); off += 4;
  buf.writeFloatLE(p.y, off); off += 4;
  buf.writeFloatLE(p.z, off); off += 4;
  buf.writeUInt8(p.r, off++);
  buf.writeUInt8(p.g, off++);
  buf.writeUInt8(p.b, off++);
}

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, buf);
console.log(`Wrote ${OUT} — ${N} points, ${(buf.length / 1024 / 1024).toFixed(2)} MB`);
