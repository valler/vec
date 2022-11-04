type n = number;
export type v = n[];
type m = v[];
const { pow: nPow, sqrt, sin, acos } = Math;
export const zero = (d: n): v => new Array(d).fill(0);
export const one = (d: n): v => new Array(d).fill(1);
export const basis = (d: n): m => {
  const o: m = [];
  for (let a = 0; a < d; ++a) {
    o[a] = [];
    for (let b = 0; b < d; ++b) {
      o[a][b] = a === b ? 1 : 0;
    }
  }
  return o;
};
export const set = (...a: v): v => a;
export const sca = (d: n) => (a: n): v => new Array(d).fill(a);
export const isEqual = (a: v, b: v) =>
  a.reduce((x, y, i) => x && y === b[i], true);
export const isValid = (x: unknown[]): x is v =>
  x.length > 0 && x.every((x) => Number.isFinite(x));
export const id = (a: v): v => [...a];
export const neg = (a: v) => {
  const o: v = [];
  const n = a.length;
  for (let i = 0; i < n; ++i) o.push(-a[i]);
  return o;
};
export const add = (a: v, b: v) => {
  const o: v = [];
  const n = a.length;
  for (let i = 0; i < n; ++i) o.push(a[i] + b[i]);
  return o;
};
export const sub = (a: v, b: v) => {
  const o: v = [];
  const n = a.length;
  for (let i = 0; i < n; ++i) o.push(a[i] - b[i]);
  return o;
};
export const mul = (a: v, b: v) => {
  const o: v = [];
  const n = a.length;
  for (let i = 0; i < n; ++i) o.push(a[i] * b[i]);
  return o;
};
export const div = (a: v, b: v) => {
  const o: v = [];
  const n = a.length;
  for (let i = 0; i < n; ++i) o.push(a[i] / b[i]);
  return o;
};
export const pow = (a: v, b: v) => {
  const o: v = [];
  const n = a.length;
  for (let i = 0; i < n; ++i) o.push(nPow(a[i], b[i]));
  return o;
};
export const mad = (a: v, b: v, c: v) => {
  const o: v = [];
  const n = a.length;
  for (let i = 0; i < n; ++i) o.push(a[i] * b[i] + c[i]);
  return o;
};
export const sAdd = (a: v, s: n) => {
  const o: v = [];
  const n = a.length;
  for (let i = 0; i < n; ++i) o.push(a[i] + s);
  return o;
};
export const sSub = (a: v, s: n) => {
  const o: v = [];
  const n = a.length;
  for (let i = 0; i < n; ++i) o.push(a[i] - s);
  return o;
};
export const sMul = (a: v, s: n) => {
  const o: v = [];
  const n = a.length;
  for (let i = 0; i < n; ++i) o.push(a[i] * s);
  return o;
};
export const sDiv = (a: v, s: n) => {
  const o: v = [];
  const n = a.length;
  for (let i = 0; i < n; ++i) o.push(a[i] / s);
  return o;
};
export const sPow = (a: v, s: n) => {
  const o: v = [];
  const n = a.length;
  for (let i = 0; i < n; ++i) o.push(nPow(a[i], s));
  return o;
};
export const sMad = (a: v, b: n, c: n): v => {
  const o: v = [];
  const n = a.length;
  for (let i = 0; i < n; ++i) o.push(a[i] * b + c);
  return o;
};
export const dot = (a: v, b: v) => a.reduce((a, c, i) => a + b[i] * c, 0);
export const sqrLen = (a: v) => a.reduce((a, b) => b * b + a, 0);
export const len = (a: v) => sqrt(a.reduce((a, b) => b * b + a, 0));
export const dir = (a: v): v => {
  const s = sqrt(a.reduce((a, b) => b * b + a, 0));
  return a.map((x) => x / s);
};
export const dist = (a: v, b: v) => len(sub(a, b));
export const sqrDist = (a: v, b: v) => sqrLen(sub(a, b));
export const area = (a: v, b: v) => {
  const n = a.length;
  const o = [0];
  for (let j = 1; j < n; ++j) {
    for (let i = 0; i < j; ++i) {
      o.push(a[i] * b[j] - a[j] * b[i]);
    }
  }
  return len(o);
};
export const sum = (...a: v[]) => a.reduce((a, b) => a.map((x, i) => x + b[i]));
export const pro = (...a: v[]) => a.reduce((a, b) => a.map((x, i) => x * b[i]));
export const coefSum = (a: v) => a.reduce((a, b) => a + b);
export const coefPro = (a: v) => {
  let o = 1;
  for (const x of a) {
    if (x === 0) return 0;
    o *= x;
  }
  return o;
};
export const proj = (n: v, v: v) => sMul(n, dot(n, v));
export const rej = (n: v, v: v) => sub(v, proj(n, v));
export const refl = (n: v, v: v) => sub(v, sMul(proj(n, v), 2));
export const conj = (n: v, v: v) => add(v, sMul(rej(n, v), -2));
export const rot = (a: v, b: v, v: v) => refl(b, refl(a, v));
export const lerp = (a: v, b: v, c: n): v => {
  const t = 1 - c;
  return a.map((x, i) => x * t + b[i] * c);
};
export const lerpFromTo = (a: v, b: v, c: n) => {
  const o: v[] = [];
  for (let i = 0; i <= c; i++) {
    o.push(lerp(a, b, i / c));
  }
  return o;
};
export const mix = (a: v, b: v, c: v): v =>
  a.map((x, i) => {
    const t = c[i];
    return x * (1 - t) + b[i] * t;
  });
export const slerp = (a: v, b: v, c: n) => {
  const d = dot(a, b);
  const x = acos(d);
  const s = sin(x);
  return sDiv(
    add(
      sMul(a, sin(x * (1 - c))),
      sMul(b, sin(x * c)),
    ),
    s,
  );
};
export const slerpFromTo = (a: v, b: v, c: n) => {
  const o: v[] = [];
  for (let i = 0; i <= c; i++) {
    o.push(slerp(a, b, i / c));
  }
  return o;
};
