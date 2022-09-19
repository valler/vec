export const vec = (a, b) => [a, b];
export const id = ([a, b]) => [a, b];
export const isEqual = ([a, b], [c, d]) => a === c && b === d;
export const zero = () => [0, 0];
export const one = () => [1, 1];
export const e1 = () => [1, 0];
export const e2 = () => [0, 1];
export const add = ([a, b], [c, d]) => [a + c, b + d];
export const sum = (a) => {
    const o = [0, 0];
    for (const x of a) {
        o[0] += x[0];
        o[1] += x[1];
    }
    return o;
};
export const sMul = (s, [a, b]) => [s * a, s * b];
export const sAdd = (s, [a, b]) => [s + a, s + b];
export const neg = ([a, b]) => [-1 * a, -1 * b];
export const sub = ([a, b], [c, d]) => [a - c, b - d];
export const mul = ([a, b], [c, d]) => [a * c, b * d];
export const dot = ([a, b], [c, d]) => a * c + b * d;
export const mag2 = ([a, b]) => a * a + b * b;
const { sqrt } = Math;
export const mag = ([a, b]) => sqrt(a * a + b * b);
export const normalize = ([a, b]) => {
    const s = sqrt(a * a + b * b);
    return [a / s, b / s];
};
//# sourceMappingURL=vec2.js.map