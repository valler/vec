type n = number;
export type v = [n, n];
type m = [v, v];
const { abs, pow: nPow, sqrt, sin, acos } = Math;
export const zero: v = [0, 0];
export const one: v = [1, 1];
export const basis: m = [[1, 0], [0, 1]];
export const vec = (a: n, b: n): v => [a, b];
export const sca = (s: n): v => [s, s];
export const isEqual = ([a, b]: v, [c, d]: v) => a === c && b === d;
export const isVec = (x: unknown[]): x is v =>
  x.length === 2 && x.every((x) => Number.isFinite(x));
export const id = ([a, b]: v): v => [a, b];
export const neg = ([a, b]: v): v => [-a, -b];
export const add = ([a, b]: v, [c, d]: v): v => [a + c, b + d];
export const sub = ([a, b]: v, [c, d]: v): v => [a - c, b - d];
export const mul = ([a, b]: v, [c, d]: v): v => [a * c, b * d];
export const div = ([a, b]: v, [c, d]: v): v => [a / c, b / d];
export const pow = ([a, b]: v, [c, d]: v): v => [nPow(a, c), nPow(b, d)];
export const mad = (
  [a, b]: v,
  [c, d]: v,
  [e, f]: v,
): v => [a * c + e, b * d + f];
export const sAdd = ([a, b]: v, s: n): v => [a + s, b + s];
export const sSub = ([a, b]: v, s: n): v => [a - s, b - s];
export const sMul = ([a, b]: v, s: n): v => [a * s, b * s];
export const sDiv = ([a, b]: v, s: n): v => [a / s, b / s];
export const sPow = ([a, b]: v, s: n): v => [nPow(a, s), nPow(b, s)];
export const sMad = ([a, b]: v, c: n, d: n): v => [a * c + d, b * c + d];
export const dot = ([a, b]: v, [c, d]: v) => a * c + b * d;
export const sqrLen = ([a, b]: v) => a * a + b * b;
export const len = ([a, b]: v) => sqrt(a * a + b * b);
export const dir = ([a, b]: v): v => {
  const s = sqrt(a * a + b * b);
  return [a / s, b / s];
};
export const dist = ([a, b]: v, [c, d]: v) => {
  const e = a - c;
  const f = b - d;
  return sqrt(e * e + f * f);
};
export const sqrDist = ([a, b]: v, [c, d]: v) => {
  const e = a - c;
  const f = b - d;
  return e * e + f * f;
};
export const area = ([a, b]: v, [c, d]: v): n => abs(a * d - b * c);
export const sum = (...a: v[]) => {
  const o: v = [0, 0];
  for (const x of a) {
    o[0] += x[0];
    o[1] += x[1];
  }
  return o;
};
export const pro = (...a: v[]): v => {
  const o: v = [1, 1];
  for (const x of a) {
    o[0] *= x[0];
    o[1] *= x[1];
  }
  return o;
};
export const coefSum = ([a, b]: v) => a + b;
export const coefPro = ([a, b]: v) => a * b;
export const proj = ([a, b]: v, [c, d]: v): v => {
  const s = a * c + b * d;
  return [s * a, s * b];
};
export const rej = ([a, b]: v, [c, d]: v): v => {
  const s = -a * c - b * d;
  return [s * a + c, s * b + d];
};
export const refl = ([a, b]: v, [c, d]: v): v => {
  const s = -2 * (a * c + b * d);
  return [s * a + c, s * b + d];
};
export const conj = ([a, b]: v, [c, d]: v): v => {
  const s = -a * c - b * d;
  return [
    -2 * (s * a + c) + c,
    -2 * (s * b + d) + d,
  ];
};
export const rot = ([a, b]: v, [c, d]: v, [e, f]: v): v => {
  let s = -2 * (a * e + b * f);
  const g = s * a + e;
  const h = s * b + f;
  s = -2 * (c * e + d * f);
  return [s * c + g, s * d + h];
};
export const lerp = ([a, b]: v, [c, d]: v, t: n): v => {
  const x = 1 - t;
  return [
    x * a + t * c,
    x * b + t * d,
  ];
};
export const lerpFromTo = (a: v, b: v, c: n) => {
  const o: v[] = [];
  for (let i = 0; i <= c; i++) {
    o.push(lerp(a, b, i / c));
  }
  return o;
};
export const mix = ([a, b]: v, [c, d]: v, [e, f]: v): v => [
  (1 - e) * a + e * c,
  (1 - f) * b + f * d,
];
export const slerp = (a: v, b: v, c: n) => {
  const d = dot(a, b);
  const x = acos(d);
  return sDiv(
    add(
      sMul(a, sin(x * (1 - c))),
      sMul(b, sin(x * c)),
    ),
    sin(x),
  );
};
export const slerpFromTo = (a: v, b: v, c: n) => {
  const o: v[] = [];
  for (let i = 0; i <= c; i++) {
    o.push(slerp(a, b, i / c));
  }
  return o;
};
