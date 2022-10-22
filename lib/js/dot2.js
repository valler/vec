export const dot = (x, y, s, r, g, b, a) => {
    const attribs = [
        { name: "pos", dim: 2 },
        { name: "size", dim: 1 },
        { name: "col", dim: 4 },
    ];
    return {
        attribs,
        stride: attribs.reduce((a, { dim }) => a + dim, 0),
        indices: [0, 1, 2, 2, 1, 3],
        // deno-fmt-ignore
        vertices: [
            x, y, s, r, g, b, a,
            x, y, s, r, g, b, a,
            x, y, s, r, g, b, a,
            x, y, s, r, g, b, a,
        ],
    };
};
export const dots = (...a) => {
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
export const vecsToDots = (p, s, r, g, b, a) => {
    const v = p.map(([x, y]) => dot(x, y, s, r, g, b, a));
    return dots(...v);
};
//# sourceMappingURL=dot2.js.map