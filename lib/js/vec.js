const { pow: nPow, sqrt, sin, acos } = Math;
export const zero = (d) => new Array(d).fill(0);
export const one = (d) => new Array(d).fill(1);
export const basis = (d) => {
    const o = [];
    for (let a = 0; a < d; ++a) {
        o[a] = [];
        for (let b = 0; b < d; ++b) {
            o[a][b] = a === b ? 1 : 0;
        }
    }
    return o;
};
export const set = (...a) => a;
export const sca = (d) => (a) => new Array(d).fill(a);
export const isEqual = (a, b) => a.reduce((x, y, i) => x && y === b[i], true);
export const isValid = (x) => x.length > 0 && x.every((x) => Number.isFinite(x));
export const id = (a) => [...a];
export const neg = (a) => {
    const o = [];
    const n = a.length;
    for (let i = 0; i < n; ++i)
        o.push(-a[i]);
    return o;
};
export const add = (a, b) => {
    const o = [];
    const n = a.length;
    for (let i = 0; i < n; ++i)
        o.push(a[i] + b[i]);
    return o;
};
export const sub = (a, b) => {
    const o = [];
    const n = a.length;
    for (let i = 0; i < n; ++i)
        o.push(a[i] - b[i]);
    return o;
};
export const mul = (a, b) => {
    const o = [];
    const n = a.length;
    for (let i = 0; i < n; ++i)
        o.push(a[i] * b[i]);
    return o;
};
export const div = (a, b) => {
    const o = [];
    const n = a.length;
    for (let i = 0; i < n; ++i)
        o.push(a[i] / b[i]);
    return o;
};
export const pow = (a, b) => {
    const o = [];
    const n = a.length;
    for (let i = 0; i < n; ++i)
        o.push(nPow(a[i], b[i]));
    return o;
};
export const mad = (a, b, c) => {
    const o = [];
    const n = a.length;
    for (let i = 0; i < n; ++i)
        o.push(a[i] * b[i] + c[i]);
    return o;
};
export const sAdd = (a, s) => {
    const o = [];
    const n = a.length;
    for (let i = 0; i < n; ++i)
        o.push(a[i] + s);
    return o;
};
export const sSub = (a, s) => {
    const o = [];
    const n = a.length;
    for (let i = 0; i < n; ++i)
        o.push(a[i] - s);
    return o;
};
export const sMul = (a, s) => {
    const o = [];
    const n = a.length;
    for (let i = 0; i < n; ++i)
        o.push(a[i] * s);
    return o;
};
export const sDiv = (a, s) => {
    const o = [];
    const n = a.length;
    for (let i = 0; i < n; ++i)
        o.push(a[i] / s);
    return o;
};
export const sPow = (a, s) => {
    const o = [];
    const n = a.length;
    for (let i = 0; i < n; ++i)
        o.push(nPow(a[i], s));
    return o;
};
export const sMad = (a, b, c) => {
    const o = [];
    const n = a.length;
    for (let i = 0; i < n; ++i)
        o.push(a[i] * b + c);
    return o;
};
export const dot = (a, b) => a.reduce((a, c, i) => a + b[i] * c, 0);
export const sqrLen = (a) => a.reduce((a, b) => b * b + a, 0);
export const len = (a) => sqrt(a.reduce((a, b) => b * b + a, 0));
export const dir = (a) => {
    const s = sqrt(a.reduce((a, b) => b * b + a, 0));
    return a.map((x) => x / s);
};
export const dist = (a, b) => len(sub(a, b));
export const sqrDist = (a, b) => sqrLen(sub(a, b));
export const area = (a, b) => {
    const n = a.length;
    const o = [0];
    for (let j = 1; j < n; ++j) {
        for (let i = 0; i < j; ++i) {
            o.push(a[i] * b[j] - a[j] * b[i]);
        }
    }
    return len(o);
};
export const sum = (...a) => a.reduce((a, b) => a.map((x, i) => x + b[i]));
export const pro = (...a) => a.reduce((a, b) => a.map((x, i) => x * b[i]));
export const coefSum = (a) => a.reduce((a, b) => a + b);
export const coefPro = (a) => {
    let o = 1;
    for (const x of a) {
        if (x === 0)
            return 0;
        o *= x;
    }
    return o;
};
export const proj = (n, v) => sMul(n, dot(n, v));
export const rej = (n, v) => sub(v, proj(n, v));
export const refl = (n, v) => sub(v, sMul(proj(n, v), 2));
export const conj = (n, v) => add(v, sMul(rej(n, v), -2));
export const rot = (a, b, v) => refl(b, refl(a, v));
export const lerp = (a, b, c) => {
    const t = 1 - c;
    return a.map((x, i) => x * t + b[i] * c);
};
export const lerpFromTo = (a, b, c) => {
    const o = [];
    for (let i = 0; i <= c; i++) {
        o.push(lerp(a, b, i / c));
    }
    return o;
};
export const mix = (a, b, c) => a.map((x, i) => {
    const t = c[i];
    return x * (1 - t) + b[i] * t;
});
export const slerp = (a, b, c) => {
    const d = dot(a, b);
    const x = acos(d);
    const s = sin(x);
    return sDiv(add(sMul(a, sin(x * (1 - c))), sMul(b, sin(x * c))), s);
};
export const slerpFromTo = (a, b, c) => {
    const o = [];
    for (let i = 0; i <= c; i++) {
        o.push(slerp(a, b, i / c));
    }
    return o;
};
//# sourceMappingURL=vec.js.map