const { pow: nPow, sqrt, sin, acos } = Math;
export const zero = [0, 0, 0];
export const one = [1, 1, 1];
export const basis = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
export const vec = (a, b, c) => [a, b, c];
export const sca = (s) => [s, s, s];
export const isEqual = ([a, b, c], [d, e, f]) => a === d && b === e && c === f;
export const id = ([a, b, c]) => [a, b, c];
export const neg = ([a, b, c]) => [-a, -b, -c];
export const add = ([a, b, c], [d, e, f]) => [a + d, b + e, c + f];
export const sub = ([a, b, c], [d, e, f]) => [a - d, b - e, c - f];
export const mul = ([a, b, c], [d, e, f]) => [a * d, b * e, c * f];
export const div = ([a, b, c], [d, e, f]) => [a / d, b / e, c / f];
export const pow = ([a, b, c], [d, e, f]) => [nPow(a, d), nPow(b, e), nPow(c, f)];
export const mad = ([a, b, c], [d, e, f], [g, h, i]) => [a * d + g, b * e + h, c * f + i];
export const sAdd = ([a, b, c], s) => [a + s, b + s, c + s];
export const sSub = ([a, b, c], s) => [a - s, b - s, c - s];
export const sMul = ([a, b, c], s) => [a * s, b * s, c * s];
export const sDiv = ([a, b, c], s) => [a / s, b / s, c / s];
export const sPow = ([a, b, c], s) => [
    nPow(a, s),
    nPow(b, s),
    nPow(c, s),
];
export const sMad = ([a, b, c], d, e) => [a * d + e, b * d + e, c * d + e];
export const dot = (a, b) => a.reduce((a, c, i) => b[i] * c + a, 0);
export const sqrLen = (a) => a.reduce((a, b) => b * b + a, 0);
export const len = (a) => sqrt(a.reduce((a, b) => b * b + a, 0));
export const dir = ([a, b, c]) => {
    const s = sqrt(a * a + b * b + c * c);
    return [a / s, b / s, c / s];
};
export const dist = ([a, b, c], [d, e, f]) => {
    const g = a - d;
    const h = b - e;
    const i = c - f;
    return sqrt(g * g + h * h + i * i);
};
export const sqrDist = ([a, b, c], [d, e, f]) => {
    const g = a - d;
    const h = b - e;
    const i = c - f;
    return g * g + h * h + i * i;
};
export const area = ([a, b, c], [d, e, f]) => {
    const g = a * e - b * d;
    const h = a * f - c * d;
    const i = b * f - c * e;
    return sqrt(g * g + h * h + i * i);
};
export const sum = (...a) => {
    const o = [0, 0, 0];
    for (const x of a) {
        o[0] += x[0];
        o[1] += x[1];
        o[2] += x[2];
    }
    return o;
};
export const pro = (...a) => {
    const o = [1, 1, 1];
    for (const x of a) {
        o[0] *= x[0];
        o[1] *= x[1];
        o[2] *= x[2];
    }
    return o;
};
export const coefSum = ([a, b, c]) => a + b + c;
export const coefPro = ([a, b, c]) => a * b * c;
export const proj = ([a, b, c], [d, e, f]) => {
    const s = a * d + b * e + c * f;
    return [s * a, s * b, s * c];
};
export const rej = ([a, b, c], [d, e, f]) => {
    const s = -a * d - b * e - c * f;
    return [s * a + d, s * b + e, s * c + f];
};
export const refl = ([a, b, c], [d, e, f]) => {
    const s = -2 * (a * d + b * e + c * f);
    return [s * a + d, s * b + e, s * c + f];
};
export const conj = ([a, b, c], [d, e, f]) => {
    const s = -a * d - b * e - c * f;
    return [
        -2 * (s * a + d) + d,
        -2 * (s * b + f) + e,
        -2 * (s * c + f) + f,
    ];
};
export const rot = ([a, b, c], [d, e, f], [g, h, i]) => {
    let s = -2 * (a * g + b * h + c * i);
    const j = s * a + g;
    const k = s * b + h;
    const l = s * c + i;
    s = -2 * (d * g + e * h + f * i);
    return [s * d + j, s * e + k, s * f + l];
};
export const lerp = ([a, b, c], [d, e, f], t) => {
    const x = 1 - t;
    return [
        x * a + t * d,
        x * b + t * e,
        x * c + t * f,
    ];
};
export const lerpFromTo = (a, b, c) => {
    const o = [];
    for (let i = 0; i <= c; i++) {
        o.push(lerp(a, b, i / c));
    }
    return o;
};
export const mix = ([a, b, c], [d, e, f], [g, h, i]) => [
    (1 - g) * a + g * d,
    (1 - h) * b + h * e,
    (1 - i) * c + i * f,
];
export const slerp = (a, b, t) => {
    const d = dot(a, b);
    const x = acos(d);
    return sDiv(add(sMul(a, sin(x * (1 - t))), sMul(b, sin(x * t))), sin(x));
};
export const slerpFromTo = (a, b, c) => {
    const o = [];
    for (let i = 0; i <= c; i++) {
        o.push(slerp(a, b, i / c));
    }
    return o;
};
//# sourceMappingURL=vec3.js.map