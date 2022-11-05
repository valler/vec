import { v as v4 } from "../../lib/js/vec4.js";
import { draw } from "../../gl/draw.js";
import { join, fromVecs, toPath } from "../../lib/js/line2.js";
import { fetchShader } from "../../lib/js/utils.js";
import { basis, slerpFromTo, sMul } from "../../lib/js/vec2.js";
import { getElementColor } from "../../gl/utils.js";
const d = document;
(async function main() {
  const canvas = d.getElementById("canvas");
  const color = getElementColor(d.body);
  const size = 1/120;
  const k = 12;
  const [a, b] = basis.map(x => sMul(x, 1 - size));
  const geo = (color: v4) => {
    const vs = slerpFromTo(a, b, k);
    const va = fromVecs(vs, size, ...color);
    const vb = toPath(vs, size, ...color);
    return join(va, vb);
  }
  const base = import.meta.url.replace(/app.js$/, "../../gl/");
  const renderer = await draw(
    canvas,
    fetchShader("line.vs", base),
    fetchShader("line.fs", base),
    Promise.resolve(geo(color)),
  );
  if (!renderer) {
    return;
  }

  const { onThemeChange, updateVertices } = renderer;
  onThemeChange([(color: v4) => updateVertices(geo(color).vertices)]);

  const van = "valueAsNumber";
  const inputZoom = d.getElementById("zoom");
  if (inputZoom instanceof HTMLInputElement && van in inputZoom) {
    const { zoom } = renderer;
    inputZoom.addEventListener("input", () => {
      zoom(inputZoom.valueAsNumber);
    });
  }
  const inputPanX = d.getElementById("pan-x");
  if (inputPanX instanceof HTMLInputElement && van in inputPanX) {
    const { panX } = renderer;
    inputPanX.addEventListener("input", () => {
      panX(inputPanX.valueAsNumber);
    });
  }
  const inputPanY = d.getElementById("pan-y");
  if (inputPanY instanceof HTMLInputElement && van in inputPanY) {
    const { panY } = renderer;
    inputPanY.addEventListener("input", () => {
      panY(inputPanY.valueAsNumber);
    });
  }
  const inputRoll = d.getElementById("roll");
  if (inputRoll instanceof HTMLInputElement && van in inputRoll) {
    const { roll } = renderer;
    const { PI } = Math;
    inputRoll.addEventListener("input", () => {
      roll(inputRoll.valueAsNumber * PI);
    });
  }
})();
