export const vecFromCSSRGBA = (x: string) =>
  x.replace(/(rgba?\()([^)]*)(\))/, "$2")
    .replace(/\s/g, "").split(",")
    .map((x: string) => parseFloat(x));

export const fetchShader = (x: string, base: string) =>
  fetch(new URL(x, base)).then((x) => x.text());
