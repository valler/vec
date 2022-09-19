type n = number;
type v = [n, n, n];
export const vec = (a: n, b: n, c: n): v => [a, b, c];
export const id = ([a, b, c]: v): v => [a, b, c];
export const isEqual = ([a, b, c]: v, [d, e, f]: v) =>
  a === d && b === e && c === f;
export const zero = (): v => [0, 0, 0];
export const one = (): v => [1, 1, 1];
export const e1 = (): v => [1, 0, 0];
export const e2 = (): v => [0, 1, 0];
export const e3 = (): v => [0, 0, 1];
export const add = ([a, b, c]: v, [d, e, f]: v): v => [a + d, b + e, c + f];
export const sum = (a: v[]) => {
  const o: v = [0, 0, 0];
  for (const x of a) {
    o[0] += x[0];
    o[1] += x[1];
    o[2] += x[2];
  }
  return o;
};
export const sMul = (s: n, [a, b, c]: v): v => [s * a, s * b, s * c];
export const sAdd = (s: n, [a, b, c]: v): v => [s + a, s + b, s + c];
export const neg = ([a, b, c]: v): v => [-1 * a, -1 * b, -1 * c];
export const sub = ([a, b, c]: v, [d, e, f]: v): v => [a - d, b - e, c - f];
export const mul = ([a, b, c]: v, [d, e, f]: v): v => [a * d, b * e, c * f];
export const dot = ([a, b, c]: v, [d, e, f]: v) => a * d + b * e + c * f;
export const mag2 = ([a, b, c]: v) => a * a + b * b + c * c;
const { sqrt } = Math;
export const mag = ([a, b, c]: v) => sqrt(a * a + b * b + c * c);
export const normalize = ([a, b, c]: v): v => {
  const s = sqrt(a * a + b * b + c * c);
  return [a / s, b / s, c / s];
};
