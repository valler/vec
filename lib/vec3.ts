type n = number;
type v = [n, n, n];
export const vec = (a: n, b: n, c: n): v => [a, b, c];
export const add = ([a, b, c]: v, [d, e, f]: v): v => [a + d, b + e, c + f];
export const sub = ([a, b, c]: v, [d, e, f]: v): v => [a - d, b - e, c - f];
export const scale = (s: n, [a, b, c]: v): v => [s * a, s * b, s * c];