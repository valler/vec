export const vecFromCSSRGBA = (x: string) =>
  x.replace(/(rgba?\()([^)]*)(\))/, "$2")
    .replace(/\s/g, "").split(",")
    .map((x: string) => parseFloat(x));
