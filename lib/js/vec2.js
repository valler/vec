const { abs, pow: nPow, sqrt, sin, acos } = Math;
export const zero = [0, 0];
export const one = [1, 1];
export const basis = [[1, 0], [0, 1]];
export const vec = (a, b) => [a, b];
export const sca = (s) => [s, s];
export const isEqual = ([a, b], [c, d]) => a === c && b === d;
export const id = ([a, b]) => [a, b];
export const neg = ([a, b]) => [-a, -b];
export const add = ([a, b], [c, d]) => [a + c, b + d];
export const sub = ([a, b], [c, d]) => [a - c, b - d];
export const mul = ([a, b], [c, d]) => [a * c, b * d];
export const div = ([a, b], [c, d]) => [a / c, b / d];
export const pow = ([a, b], [c, d]) => [nPow(a, c), nPow(b, d)];
export const mad = ([a, b], [c, d], [e, f]) => [a * c + e, b * d + f];
export const sAdd = ([a, b], s) => [a + s, b + s];
export const sSub = ([a, b], s) => [a - s, b - s];
export const sMul = ([a, b], s) => [a * s, b * s];
export const sDiv = ([a, b], s) => [a / s, b / s];
export const sPow = ([a, b], s) => [nPow(a, s), nPow(b, s)];
export const sMad = ([a, b], c, d) => [a * c + d, b * c + d];
export const dot = ([a, b], [c, d]) => a * c + b * d;
export const sqrLen = ([a, b]) => a * a + b * b;
export const len = ([a, b]) => sqrt(a * a + b * b);
export const dir = ([a, b]) => {
    const s = sqrt(a * a + b * b);
    return [a / s, b / s];
};
export const dist = ([a, b], [c, d]) => {
    const e = a - c;
    const f = b - d;
    return sqrt(e * e + f * f);
};
export const sqrDist = ([a, b], [c, d]) => {
    const e = a - c;
    const f = b - d;
    return e * e + f * f;
};
export const area = ([a, b], [c, d]) => abs(a * d - b * c);
export const sum = (...a) => {
    const o = [0, 0];
    for (const x of a) {
        o[0] += x[0];
        o[1] += x[1];
    }
    return o;
};
export const pro = (...a) => {
    const o = [1, 1];
    for (const x of a) {
        o[0] *= x[0];
        o[1] *= x[1];
    }
    return o;
};
export const coefSum = ([a, b]) => a + b;
export const coefPro = ([a, b]) => a * b;
export const proj = ([a, b], [c, d]) => {
    const s = a * c + b * d;
    return [s * a, s * b];
};
export const rej = ([a, b], [c, d]) => {
    const s = -a * c - b * d;
    return [s * a + c, s * b + d];
};
export const refl = ([a, b], [c, d]) => {
    const s = -2 * (a * c + b * d);
    return [s * a + c, s * b + d];
};
export const conj = ([a, b], [c, d]) => {
    const s = -a * c - b * d;
    return [
        -2 * (s * a + c) + c,
        -2 * (s * b + d) + d,
    ];
};
export const rot = ([a, b], [c, d], [e, f]) => {
    let s = -2 * (a * e + b * f);
    const g = s * a + e;
    const h = s * b + f;
    s = -2 * (c * e + d * f);
    return [s * c + g, s * d + h];
};
export const lerp = ([a, b], [c, d], t) => {
    const x = 1 - t;
    return [
        x * a + t * c,
        x * b + t * d,
    ];
};
export const mix = ([a, b], [c, d], [e, f]) => [
    (1 - e) * a + e * c,
    (1 - f) * b + f * d,
];
export const slerp = (a, b, c) => {
    const d = dot(a, b);
    const x = acos(d);
    return sDiv(add(sMul(a, sin(x * (1 - c))), sMul(b, sin(x * c))), sin(x));
};
//# sourceMappingURL=vec2.js.map