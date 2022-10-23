export const vecFromCSSRGBA = (x) => x.replace(/(rgba?\()([^)]*)(\))/, "$2")
    .replace(/\s/g, "").split(",")
    .map((x) => parseFloat(x));
//# sourceMappingURL=utils.js.map