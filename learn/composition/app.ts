import type { v } from "../../lib/js/vec2.js";
import { vec, add } from "../../lib/js/vec2.js";
const [c0, c1, c2] = document.querySelectorAll("#svg circle");
const ranges = document.querySelectorAll("#ranges input[type='range']");
const [ r0, r1, r2, r3 ] = ranges;
const setPos = (c: SVGCircleElement, [x, y]: v) => {
  c.cx.baseVal.value = x;
  c.cy.baseVal.value = y;
}
const hasQueried = true &&
  c0 instanceof SVGCircleElement &&
  c1 instanceof SVGCircleElement &&
  c2 instanceof SVGCircleElement &&
  r0 instanceof HTMLInputElement &&
  r1 instanceof HTMLInputElement &&
  r2 instanceof HTMLInputElement &&
  r3 instanceof HTMLInputElement;
if (hasQueried) {
  const update = () => {
    const a = vec(
      r0.valueAsNumber,
      r1.valueAsNumber,
    );
    const b = vec(
      r2.valueAsNumber,
      r3.valueAsNumber,
    );
    setPos(c0, a);
    setPos(c1, b);
    setPos(c2, add(a, b));
  }
  for (const r of ranges) {
    r.addEventListener("change", update);
  }
}