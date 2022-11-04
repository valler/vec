export const vecFromCSSRGBA = (x) => x.replace(/(rgba?\()([^)]*)(\))/, "$2")
    .replace(/\s/g, "").split(",")
    .map((x) => parseFloat(x));
export const fetchShader = (x, base) => fetch(new URL(x, base)).then((x) => x.text());
//# sourceMappingURL=utils.js.map