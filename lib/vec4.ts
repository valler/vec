type n = number;
type v = [n, n, n, n];
export const vec = (a: n, b: n, c: n, d: n): v => [a, b, c, d];
export const id = ([a, b, c, d]: v): v => [a, b, c, d];
export const isEqual = ([a, b, c, d]: v, [e, f, g, h]: v) =>
  a === e && b === f && c === g && d === h;
export const zero = (): v => [0, 0, 0, 0];
export const one = (): v => [1, 1, 1, 1];
export const e1 = (): v => [1, 0, 0, 0];
export const e2 = (): v => [0, 1, 0, 0];
export const e3 = (): v => [0, 0, 1, 0];
export const e4 = (): v => [0, 0, 0, 1];
export const add = (
  [a, b, c, d]: v,
  [e, f, g, h]: v,
): v => [a + e, b + f, c + g, d + h];
export const sum = (a: v[]) => {
  const o: v = [0, 0, 0, 0];
  for (const x of a) {
    o[0] += x[0];
    o[1] += x[1];
    o[2] += x[2];
    o[3] += x[3];
  }
  return o;
};
export const sMul = (s: n, [a, b, c, d]: v): v => [s * a, s * b, s * c, s * d];
export const sAdd = (s: n, [a, b, c, d]: v): v => [s + a, s + b, s + c, s + d];
export const neg = ([a, b, c, d]: v): v => [-1 * a, -1 * b, -1 * c, -1 * d];
export const sub = (
  [a, b, c, d]: v,
  [e, f, g, h]: v,
): v => [a - e, b - f, c - g, d - h];
export const mul = (
  [a, b, c, d]: v,
  [e, f, g, h]: v,
): v => [a * e, b * f, c * g, d * h];
export const dot = (
  [a, b, c, d]: v,
  [e, f, g, h]: v,
) => a * e + b * f + c * g + d * h;
export const mag2 = ([a, b, c, d]: v) => a * a + b * b + c * c + d * d;
const { sqrt } = Math;
export const mag = ([a, b, c, d]: v) => sqrt(a * a + b * b + c * c + d * d);
export const normalize = ([a, b, c, d]: v): v => {
  const s = sqrt(a * a + b * b + c * c + d * d);
  return [a / s, b / s, c / s, d / s];
};
