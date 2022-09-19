export const vec = (a, b, c) => [a, b, c];
export const id = ([a, b, c]) => [a, b, c];
export const isEqual = ([a, b, c], [d, e, f]) => a === d && b === e && c === f;
export const zero = () => [0, 0, 0];
export const one = () => [1, 1, 1];
export const e1 = () => [1, 0, 0];
export const e2 = () => [0, 1, 0];
export const e3 = () => [0, 0, 1];
export const add = ([a, b, c], [d, e, f]) => [a + d, b + e, c + f];
export const sum = (a) => {
    const o = [0, 0, 0];
    for (const x of a) {
        o[0] += x[0];
        o[1] += x[1];
        o[2] += x[2];
    }
    return o;
};
export const sMul = (s, [a, b, c]) => [s * a, s * b, s * c];
export const sAdd = (s, [a, b, c]) => [s + a, s + b, s + c];
export const neg = ([a, b, c]) => [-1 * a, -1 * b, -1 * c];
export const sub = ([a, b, c], [d, e, f]) => [a - d, b - e, c - f];
export const mul = ([a, b, c], [d, e, f]) => [a * d, b * e, c * f];
export const dot = ([a, b, c], [d, e, f]) => a * d + b * e + c * f;
export const mag2 = ([a, b, c]) => a * a + b * b + c * c;
const { sqrt } = Math;
export const mag = ([a, b, c]) => sqrt(a * a + b * b + c * c);
export const normalize = ([a, b, c]) => {
    const s = sqrt(a * a + b * b + c * c);
    return [a / s, b / s, c / s];
};
//# sourceMappingURL=vec3.js.map