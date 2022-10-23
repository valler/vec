type n = number;
export type v = [n, n, n, n];
type m = [v, v, v, v];
const { pow: nPow, sqrt, sin, acos } = Math;
export const zero: v = [0, 0, 0, 0];
export const one: v = [1, 1, 1, 1];
export const basis: m = [
  [1, 0, 0, 0],
  [0, 1, 0, 0],
  [0, 0, 1, 0],
  [0, 0, 0, 1],
];
export const vec = (a: n, b: n, c: n, d: n): v => [a, b, c, d];
export const sca = (s: n): v => [s, s, s, s];
export const isEqual = ([a, b, c, d]: v, [e, f, g, h]: v) =>
  a === e && b === f && c === g && d === h;
export const isVec = (x: unknown[]): x is v =>
  x.length === 4 && x.every((x) => Number.isFinite(x));
export const id = ([a, b, c, d]: v): v => [a, b, c, d];
export const neg = ([a, b, c, d]: v): v => [-a, -b, -c, -d];
export const add = (
  [a, b, c, d]: v,
  [e, f, g, h]: v,
): v => [a + e, b + f, c + g, d + h];
export const sub = (
  [a, b, c, d]: v,
  [e, f, g, h]: v,
): v => [a - e, b - f, c - g, d - h];
export const mul = (
  [a, b, c, d]: v,
  [e, f, g, h]: v,
): v => [a * e, b * f, c * g, d * h];
export const div = (
  [a, b, c, d]: v,
  [e, f, g, h]: v,
): v => [a / e, b / f, c / g, d / h];
export const pow = ([a, b, c, d]: v, [e, f, g, h]: v): v => [
  nPow(a, e),
  nPow(b, f),
  nPow(c, g),
  nPow(d, h),
];
export const mad = (
  [a, b, c, d]: v,
  [e, f, g, h]: v,
  [i, j, k, l]: v,
) => [
  a * e + i,
  b * f + j,
  c * g + k,
  d * h + l,
];
export const sAdd = ([a, b, c, d]: v, s: n): v => [a + s, b + s, c + s, d + s];
export const sSub = ([a, b, c, d]: v, s: n): v => [a - s, b - s, c - s, d - s];
export const sMul = ([a, b, c, d]: v, s: n): v => [a * s, b * s, c * s, d * s];
export const sDiv = ([a, b, c, d]: v, s: n): v => [a / s, b / s, c / s, d / s];
export const sPow = ([a, b, c, d]: v, s: n): v => [
  nPow(a, s),
  nPow(b, s),
  nPow(c, s),
  nPow(d, s),
];
export const sMad = (
  [a, b, c, d]: v,
  e: n,
  f: n,
): v => [a * e + f, b * e + f, c * e + f, d * e + f];
export const dot = (a: v, b: v) => a.reduce((a, c, i) => b[i] * c + a, 0);
export const sqrLen = (a: v) => a.reduce((a, b) => b * b + a, 0);
export const len = (a: v) => sqrt(a.reduce((a, b) => b * b + a, 0));
export const dir = ([a, b, c, d]: v): v => {
  const s = sqrt(a * a + b * b + c * c + d * d);
  return [a / s, b / s, c / s, d / s];
};
export const dist = ([a, b, c, d]: v, [e, f, g, h]: v) => {
  const i = a - e;
  const j = b - f;
  const k = c - g;
  const l = d - h;
  return sqrt(i * i + j * j + k * k + l * l);
};
export const sqrDist = ([a, b, c, d]: v, [e, f, g, h]: v) => {
  const i = a - e;
  const j = b - f;
  const k = c - g;
  const l = d - h;
  return i * i + j * j + k * k + l * l;
};
export const area = (a: v, b: v) => {
  const la = sqrt(a.reduce((a, b) => b * b + a, 0));
  const il = 1 / la;
  const s = a.reduce((a, c, i) => a - il * c * b[i], 0);
  const sl = s * il;
  return la * sqrt(a.reduce((a, c, i) => {
    const d = sl * c + b[i];
    return d * d + a;
  }, 0));
};

export const sum = (...a: v[]) => {
  const o: v = [0, 0, 0, 0];
  for (const x of a) {
    o[0] += x[0];
    o[1] += x[1];
    o[2] += x[2];
    o[3] += x[3];
  }
  return o;
};
export const pro = (...a: v[]) => {
  const o: v = [1, 1, 1, 1];
  for (const x of a) {
    o[0] *= x[0];
    o[1] *= x[1];
    o[2] *= x[2];
    o[3] *= x[3];
  }
  return o;
};
export const coefSum = ([a, b, c, d]: v) => a + b + c + d;
export const coefPro = ([a, b, c, d]: v) => a * b * c * d;
export const proj = ([a, b, c, d]: v, [e, f, g, h]: v): v => {
  const s = a * e + b * f + c * g + d * h;
  return [s * a, s * b, s * c, s * d];
};
export const rej = ([a, b, c, d]: v, [e, f, g, h]: v): v => {
  const s = -a * e - b * f - c * g - d * h;
  return [s * a + e, s * b + f, s * c + g, s * d + h];
};
export const refl = ([a, b, c, d]: v, [e, f, g, h]: v): v => {
  const s = -2 * (a * e + b * f + c * g + d * h);
  return [s * a + e, s * b + f, s * c + g, s * d + h];
};
export const conj = ([a, b, c, d]: v, [e, f, g, h]: v): v => {
  const s = -a * e - b * f - c * g - d * h;
  return [
    -2 * (s * a + e) + e,
    -2 * (s * b + f) + f,
    -2 * (s * c + g) + g,
    -2 * (s * d + h) + h,
  ];
};
export const rot = ([a, b, c, d]: v, [e, f, g, h]: v, [i, j, k, l]: v): v => {
  let s = -2 * (a * i + b * j + c * k + d * l);
  const m = s * a + i;
  const n = s * b + j;
  const o = s * c + k;
  const p = s * d + l;
  s = -2 * (e * i + f * j + g * k + h * l);
  return [s * e + m, s * f + n, s * g + o, s * h + p];
};
export const lerp = ([a, b, c, d]: v, [e, f, g, h]: v, t: n): v => {
  const x = 1 - t;
  return [
    x * a + t * e,
    x * b + t * f,
    x * c + t * g,
    x * d + t * h,
  ];
};
export const lerpFromTo = (a: v, b: v, c: n) => {
  const o: v[] = [];
  for (let i = 0; i <= c; i++) {
    o.push(lerp(a, b, i / c));
  }
  return o;
};
export const mix = ([a, b, c, d]: v, [e, f, g, h]: v, [i, j, k, l]: v): v => [
  (1 - i) * a + i * e,
  (1 - j) * b + j * f,
  (1 - k) * c + k * g,
  (1 - l) * d + l * h,
];
export const slerp = (a: v, b: v, t: n) => {
  const d = dot(a, b);
  const x = acos(d);
  return sDiv(
    add(
      sMul(a, sin(x * (1 - t))),
      sMul(b, sin(x * t)),
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
