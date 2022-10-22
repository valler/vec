import { vec, lerp, slerp } from "../../lib/js/vec2.js";
const d = document;
const [c0, c1, c2, c3] = d.querySelectorAll("#svg circle");
const r = d.querySelector("#ranges input[type='range']");
const getPos = (c) => vec(c.cx.baseVal.value, c.cy.baseVal.value);
const setPos = (c, [x, y]) => {
    c.cx.baseVal.value = x;
    c.cy.baseVal.value = y;
};
const hasQueried = true &&
    c0 instanceof SVGCircleElement &&
    c1 instanceof SVGCircleElement &&
    c2 instanceof SVGCircleElement &&
    c3 instanceof SVGCircleElement &&
    r instanceof HTMLInputElement;
if (hasQueried) {
    const a = getPos(c0);
    const b = getPos(c1);
    r.addEventListener("change", () => {
        const t = r.valueAsNumber;
        setPos(c2, lerp(a, b, t));
        setPos(c3, slerp(a, b, t));
    });
}
//# sourceMappingURL=app.js.map