type n = number;
type v = [n, n];
export const vec = (a: n, b: n): v => [a, b];
export const id = ([a, b]: v): v => [a, b];
export const isEqual = ([a, b]: v, [c, d]: v) => a === c && b === d;
export const zero = (): v => [0, 0];
export const one = (): v => [1, 1];
export const e1 = (): v => [1, 0];
export const e2 = (): v => [0, 1];
export const add = ([a, b]: v, [c, d]: v): v => [a + c, b + d];
export const sum = (a: v[]) => {
  const o: v = [0, 0];
  for (const x of a) {
    o[0] += x[0];
    o[1] += x[1];
  }
  return o;
};
export const sMul = (s: n, [a, b]: v): v => [s * a, s * b];
export const neg = ([a, b]: v): v => [-1 * a, -1 * b];
export const sub = ([a, b]: v, [c, d]: v): v => [a - c, b - d];
export const mul = ([a, b]: v, [c, d]: v): v => [a * c, b * d];
export const dot = ([a, b]: v, [c, d]: v) => a * c + b * d;
export const mag2 = ([a, b]: v) => a * a + b * b;
const { sqrt } = Math;
export const mag = ([a, b]: v) => sqrt(a * a + b * b);
export const normalize = ([a, b]: v): v => {
  const s = sqrt(a * a + b * b);
  return [a / s, b / s];
};
