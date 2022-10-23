import type { v as v4 } from "../../lib/js/vec4.js";
import { Dots, vecsToDots } from  "../../lib/js/dot2.js";
import { render } from "../../gl/renderDots.js";
import { basis, slerpFromTo, sMul } from "../../lib/js/vec2.js";
import { isVec as isVec3 } from "../../lib/js/vec3.js";
import { isVec as isVec4 } from "../../lib/js/vec4.js";
import { vecFromCSSRGBA } from "../../lib/js/utils.js";

const darkTheme = matchMedia("(prefers-color-scheme: dark)");

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

    const arc = slerpFromTo(halfRight, halfTop, 6);
    const dotSize = .05;
    const createDots = (darkTheme: { matches: boolean }) => {
      const { color: colorString } = getComputedStyle(canvas);
      const unknownColor = vecFromCSSRGBA(colorString);
      let color: v4;
      if (isVec4(unknownColor)) {
        const [r, g, b, a] = unknownColor;
        color = [
          r / 255,
          g / 255,
          b / 255,
          a,
        ];
      } else if (isVec3(unknownColor)) {
        const [r, g, b] = unknownColor;
        color = [
          r / 255,
          g / 255,
          b / 255,
          1,
        ];
      } else if (darkTheme.matches) {
        color = [1, 1, 1, 1];
      } else {
        color = [0, 0, 0, 0];
      }
      return vecsToDots(arc, dotSize, ...color);
    };

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
      createDots(darkTheme),
    ];
    let renderer: {
      updateVertices: (x: number[]) => void,
      zoom: (x: number) => void,
    } | undefined;
    if (range instanceof HTMLInputElement) {
      renderer = render(
        ...args,
        { hasDPCB, zoom: range.valueAsNumber },
      );
      if (renderer) {
        const { zoom } = renderer;
        range.addEventListener("change", () => {
          zoom(range.valueAsNumber);
        });
      }
    } else {
      renderer = render(...args, { hasDPCB });
    }
    if (renderer) {
      const { updateVertices } = renderer;
      darkTheme.addEventListener("change", (e) => {
        updateVertices(createDots(e).vertices);
      });
    }
  }
}