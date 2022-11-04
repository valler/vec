import { draw } from "../../gl/draw.js";
import { join, fromVecs, toPath } from "../../lib/js/line2.js";
import { fetchShader } from "../../lib/js/utils.js";
import { basis, slerpFromTo, sMul } from "../../lib/js/vec2.js";
import { getElementColor } from "../../gl/utils.js";
const d = document;
(async function main() {
    const canvas = d.getElementById("canvas");
    const color = getElementColor(d.body);
    const size = 1 / 120;
    const k = 12;
    const [a, b] = basis.map(x => sMul(x, 1 - size));
    const geo = (color) => {
        const vs = slerpFromTo(a, b, k);
        const va = fromVecs(vs, size, ...color);
        const vb = toPath(vs, size, ...color);
        return join(va, vb);
    };
    const base = import.meta.url.replace(/app.js$/, "../../gl/");
    const renderer = await draw(canvas, fetchShader("line.vs", base), fetchShader("line.fs", base), Promise.resolve(geo(color)));
    if (!renderer) {
        return;
    }
    const { onThemeChange, updateVertices } = renderer;
    onThemeChange([(color) => updateVertices(geo(color).vertices)]);
    const inputZoom = d.getElementById("zoom");
    if (inputZoom instanceof HTMLInputElement && inputZoom.type === "range") {
        const { zoom } = renderer;
        inputZoom.addEventListener("change", () => {
            zoom(inputZoom.valueAsNumber);
        });
    }
    const inputPanX = d.getElementById("pan-x");
    if (inputPanX instanceof HTMLInputElement && inputPanX.type === "range") {
        const { panX } = renderer;
        inputPanX.addEventListener("change", () => {
            panX(inputPanX.valueAsNumber);
        });
    }
    const inputPanY = d.getElementById("pan-y");
    if (inputPanY instanceof HTMLInputElement && inputPanY.type === "range") {
        const { panY } = renderer;
        inputPanY.addEventListener("change", () => {
            panY(inputPanY.valueAsNumber);
        });
    }
})();
//# sourceMappingURL=app.js.map