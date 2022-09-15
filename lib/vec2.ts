type n = number;
type v = [n, n];
export const vec = (a: n, b: n): v => [a, b];
export const add = ([a, b]: v, [c, d]: v): v => [a + c, b + d];
export const sub = ([a, b]: v, [c, d]: v): v => [a - c, b - d];
export const scale = (s: n, [a, b]: v): v => [s * a, s * b];