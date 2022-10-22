import type { v } from "./vec2.js";
type n = number;
export type Dot = {
  attribs: { name: string; dim: number }[];
  stride: number;
  vertices: number[];
  indices: [n, n, n, n, n, n];
};
export type Dots = {
  attribs: { name: string; dim: number }[];
  stride: number;
  vertices: number[];
  indices: number[];
};
export const dot = (
  x: number,
  y: number,
  s: number,
  r: number,
  g: number,
  b: number,
  a: number,
): Dot => {
  const attribs = [
    { name: "pos", dim: 2 },
    { name: "size", dim: 1 },
    { name: "col", dim: 4 },
  ];
  return {
    attribs,
    stride: attribs.reduce((a, { dim }) => a + dim, 0),
    indices: [0, 1, 2, 2, 1, 3],
    // deno-fmt-ignore
    vertices: [
      x, y, s, r, g, b, a,
      x, y, s, r, g, b, a,
      x, y, s, r, g, b, a,
      x, y, s, r, g, b, a,
    ],
  };
};
export const dots = (...a: Dot[]): Dots => {
  const vertices: number[] = [];
  const indices: number[] = [];
  const m = 4; // verts per sprite
  a.forEach((x, i) => {
    vertices.push(...x.vertices);
    x.indices.forEach((y) => {
      indices.push(m * i + y);
    });
  });
  const { attribs, stride } = a[0];
  return { attribs, stride, vertices, indices };
};
export const vecsToDots = (p: v[], s: n, r: n, g: n, b: n, a: n) => {
  const v = p.map(([x, y]) => dot(x, y, s, r, g, b, a));
  return dots(...v);
};
