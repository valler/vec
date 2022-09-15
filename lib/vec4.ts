type n = number;
type v = [n, n, n, n];
export const vec = (a: n, b: n, c: n, d: n): v => [a, b, c, d];
export const add = ([a, b, c, d]: v, [e, f, g, h]: v): v => [a + e, b + f, c + g, d + h];
export const sub = ([a, b, c, d]: v, [e, f, g, h]: v): v => [a - e, b - f, c - g, d - h];
export const scale = (s: n, [a, b, c, d]: v): v => [s * a, s * b, s * c, s * d];