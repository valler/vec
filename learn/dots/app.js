import { draw } from "../../gl/draw.js";
import { fromVecs } from "../../lib/js/dot2.js";
import { fetchShader } from "../../lib/js/utils.js";
import { slerpFromTo, basis, sMul } from "../../lib/js/vec2.js";
import { getElementColor } from "../../gl/utils.js";
const d = document;
(async function main() {
    const canvas = d.getElementById("canvas");
    const color = getElementColor(d.body);
    const size = 0.05;
    const [a, b] = basis.map(x => sMul(x, 1 - size));
    const k = 5;
    const geometry = fromVecs(slerpFromTo(a, b, k), size, ...color);
    const base = import.meta.url.replace(/app.js$/, "../../gl/");
    const renderer = await draw(canvas, fetchShader("dot.vs", base), fetchShader("dot.fs", base), Promise.resolve(geometry));
    if (!renderer) {
        return;
    }
    const { onThemeChange, updateVertices } = renderer;
    onThemeChange([(c) => {
            updateVertices(fromVecs(slerpFromTo(a, b, k), size, ...c).vertices);
        }]);
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
//# sourceMappingURL=app.js.map