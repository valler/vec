export const vec = (a, b, c, d) => [a, b, c, d];
export const id = ([a, b, c, d]) => [a, b, c, d];
export const isEqual = ([a, b, c, d], [e, f, g, h]) => a === e && b === f && c === g && d === h;
export const zero = () => [0, 0, 0, 0];
export const one = () => [1, 1, 1, 1];
export const e1 = () => [1, 0, 0, 0];
export const e2 = () => [0, 1, 0, 0];
export const e3 = () => [0, 0, 1, 0];
export const e4 = () => [0, 0, 0, 1];
export const add = ([a, b, c, d], [e, f, g, h]) => [a + e, b + f, c + g, d + h];
export const sum = (a) => {
    const o = [0, 0, 0, 0];
    for (const x of a) {
        o[0] += x[0];
        o[1] += x[1];
        o[2] += x[2];
        o[3] += x[3];
    }
    return o;
};
export const sMul = (s, [a, b, c, d]) => [s * a, s * b, s * c, s * d];
export const neg = ([a, b, c, d]) => [-1 * a, -1 * b, -1 * c, -1 * d];
export const sub = ([a, b, c, d], [e, f, g, h]) => [a - e, b - f, c - g, d - h];
export const mul = ([a, b, c, d], [e, f, g, h]) => [a * e, b * f, c * g, d * h];
export const dot = ([a, b, c, d], [e, f, g, h]) => a * e + b * f + c * g + d * h;
export const mag2 = ([a, b, c, d]) => a * a + b * b + c * c + d * d;
const { sqrt } = Math;
export const mag = ([a, b, c, d]) => sqrt(a * a + b * b + c * c + d * d);
export const normalize = ([a, b, c, d]) => {
    const s = sqrt(a * a + b * b + c * c + d * d);
    return [a / s, b / s, c / s, d / s];
};
//# sourceMappingURL=vec4.js.map