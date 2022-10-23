import { Dots, vecsToDots } from  "../../lib/js/dot2.js";
import { render } from "../../gl/renderDots.js";
import { basis, slerpFromTo, sMul } from "../../lib/js/vec2.js";

const hasDevicePixelContentBox = async (): Promise<boolean> => {
  try {
    return await new Promise((resolve) => {
      const ro = new ResizeObserver((entries) => {
        resolve(entries.every((entry) => "devicePixelContentBoxSize" in entry));
        ro.disconnect();
      });
      ro.observe(document.body, { box: "device-pixel-content-box" });
    });
  } catch {
    return false;
  }
};
const range = document.querySelector("#ranges input[type='range']");
const canvas = document.getElementById("canvas");
if (canvas instanceof HTMLCanvasElement) {
  const gl = canvas.getContext("webgl2");
  if (gl) {
    const base = import.meta.url
      .replace(/app.js$/, "../../gl/");
    const fetchShader = (x: string) =>
      fetch(new URL(`${x}.glsl`, base))
        .then((x) => x.text());
    const [
      vertexShader,
      fragmentShader,
      hasDPCB,
    ] = await Promise.all([
      fetchShader("vert"),
      fetchShader("frag"),
      hasDevicePixelContentBox(),
    ]);

    const [right, top] = basis;
    const halfRight = sMul(right, .5);
    const halfTop = sMul(top, .5);

    const args: [
      HTMLCanvasElement,
      WebGL2RenderingContext,
      string,
      string,
      Dots,
    ] = [
      canvas,
      gl,
      vertexShader,
      fragmentShader,
      vecsToDots(slerpFromTo(halfRight, halfTop, 6), .05, 1, 1, 1, 1),
    ];
    if (range instanceof HTMLInputElement) {
      const { zoom } = render(
        ...args,
        { hasDPCB, zoom: range.valueAsNumber },
      );
      range.addEventListener("change", () => {
        zoom(range.valueAsNumber);
      });
    } else {
      render(...args, { hasDPCB });
    }
  }
}