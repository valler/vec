export const stride = 7;
export const set = (x, y, s, r, g, b, a) => {
    return {
        attribs: [
            { name: "col", dim: 4 },
            { name: "pos", dim: 2 },
            { name: "size", dim: 1 },
        ],
        stride: 7,
        indices: [0, 1, 2, 2, 1, 3],
        // deno-fmt-ignore
        vertices: [
            r, g, b, a, x, y, s,
            r, g, b, a, x, y, s,
            r, g, b, a, x, y, s,
            r, g, b, a, x, y, s,
        ],
    };
};
export const id = (x) => structuredClone(x);
export const isEqual = (a, b) => {
    const { stride: as0, attribs: [{ name: an1, dim: ad1 }, { name: an2, dim: ad2 }, { name: an3, dim: ad3 },], indices: ai, vertices: av, } = a;
    const { stride: bs0, attribs: [{ name: bn1, dim: bd1 }, { name: bn2, dim: bd2 }, { name: bn3, dim: bd3 },], indices: bi, vertices: bv, } = b;
    return (as0 === bs0 &&
        an1 === bn1 &&
        ad1 === bd1 &&
        an2 === bn2 &&
        ad2 === bd2 &&
        an3 === bn3 &&
        ad3 === bd3 &&
        ai.every((v, i) => v === bi[i]) &&
        av.every((v, i) => v === bv[i]));
};
export const isValid = (a) => {
    const { stride: st, indices: { length: li }, vertices: { length: lv }, attribs: [{ name: n0, dim: d0 }, { name: n1, dim: d1 }, { name: n2, dim: d2 },], } = a;
    return [
        st === 7,
        n0 === "col",
        d0 === 4,
        n1 === "pos",
        d1 === 2,
        n2 === "size",
        d2 === 1,
        lv === 4 * st * li / 6,
        li % 6 === 0,
        li > 0,
    ].every((x) => x);
};
export const fromArray = (a) => {
    const vertices = [];
    const indices = [];
    const m = 4; // verts per sprite
    a.forEach((x, i) => {
        vertices.push(...x.vertices);
        x.indices.forEach((y) => {
            indices.push(m * i + y);
        });
    });
    const { attribs, stride } = a[0];
    return { attribs, stride, vertices, indices };
};
export const join = (a, b) => {
    const o = a.indices[a.indices.length - 1] + 1;
    return {
        stride: 7,
        attribs: [
            { name: "col", dim: 4 },
            { name: "pos", dim: 2 },
            { name: "size", dim: 1 },
        ],
        vertices: a.vertices.concat(b.vertices),
        indices: a.indices.concat(b.indices.map((x) => x + o)),
    };
};
export const fromVecs = (v, s, r, g, b, a) => fromArray(v.map(([x, y]) => set(x, y, s, r, g, b, a)));
//# sourceMappingURL=dot2.js.map