import type { v } from "./vec.ts";
import type { v as v2 } from "./vec2.ts";

type n = number;

type Stride = 9;

export type Attribs = [
  { name: "col"; dim: 4 },
  { name: "pos"; dim: 4 },
  { name: "size"; dim: 1 },
];

export type Indices = [0, 1, 2, 2, 1, 3];

export type A = {
  stride: Stride;
  attribs: Attribs;
  indices: Indices;
  vertices: v;
};

export type B = {
  stride: Stride;
  attribs: Attribs;
  indices: n[];
  vertices: v;
};

export const stride: Stride = 9;

export const set = (
  x: n,
  y: n,
  x1: n,
  y1: n,
  s: n,
  r: n,
  g: n,
  b: n,
  a: n,
): A => {
  return {
    attribs: [
      { name: "col", dim: 4 },
      { name: "pos", dim: 4 },
      { name: "size", dim: 1 },
    ],
    stride,
    indices: [0, 1, 2, 2, 1, 3],
    // deno-fmt-ignore
    vertices: [
      r, g, b, a, x, y, x1, y1, s,
      r, g, b, a, x, y, x1, y1, s,
      r, g, b, a, x, y, x1, y1, s,
      r, g, b, a, x, y, x1, y1, s,
    ],
  };
};

export const id = (x: A) => structuredClone(x);

export const isEqual = (a: A, b: A) => {
  const {
    stride: as0,
    attribs: [
      { name: an1, dim: ad1 },
      { name: an2, dim: ad2 },
      { name: an3, dim: ad3 },
    ],
    indices: ai,
    vertices: av,
  } = a;
  const {
    stride: bs0,
    attribs: [
      { name: bn1, dim: bd1 },
      { name: bn2, dim: bd2 },
      { name: bn3, dim: bd3 },
    ],
    indices: bi,
    vertices: bv,
  } = b;
  return (
    as0 === bs0 &&
    an1 === bn1 &&
    ad1 === bd1 &&
    an2 === bn2 &&
    ad2 === bd2 &&
    an3 === bn3 &&
    ad3 === bd3 &&
    ai.every((v, i) => v === bi[i]) &&
    av.every((v, i) => v === bv[i])
  );
};

export const isValid = (a: A) => {
  const {
    stride: st,
    indices: { length: li },
    vertices: { length: lv },
    attribs: [
      { name: n0, dim: d0 },
      { name: n1, dim: d1 },
      { name: n2, dim: d2 },
    ],
  } = a;
  return [
    st === stride,
    n0 === "col",
    d0 === 4,
    n1 === "pos",
    d1 === 4,
    n2 === "size",
    d2 === 1,
    lv === 4 * st * li / 6,
    li % 6 === 0,
    li > 0,
  ].every((x) => x);
};

export const fromArray = (a: A[]): B => {
  const vertices: n[] = [];
  const indices: n[] = [];
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

export const join = (a: B, b: B): B => {
  const offset = a.indices[a.indices.length - 1] + 1;
  return {
    stride: 9,
    attribs: [
      { name: "col", dim: 4 },
      { name: "pos", dim: 4 },
      { name: "size", dim: 1 },
    ],
    vertices: a.vertices.concat(b.vertices),
    indices: a.indices.concat(b.indices.map((x) => x + offset)),
  };
};

export const fromVecs = (v: v2[], s: n, r: n, g: n, b: n, a: n) =>
  fromArray(v.map(([x, y]) => set(0, 0, x, y, s, r, g, b, a)));

export const toPath = (v: v2[], s: n, r: n, g: n, b: n, a: n) => {
  const n = v.length;
  const k = n - 1;
  const o = [];
  for (let i = 0; i < k; ++i) {
    const [x0, y0] = v[i];
    const [x1, y1] = v[i + 1];
    o.push(set(x0, y0, x1, y1, s, r, g, b, a));
  }
  return fromArray(o);
};
