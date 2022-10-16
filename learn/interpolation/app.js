import { vec, lerp, slerp } from "../../lib/js/vec2.js";
const d = document;
const [c0, c1, c2, c3] = d.querySelectorAll("#svg circle");
const r = d.querySelector("#ranges input");
const getPos = (el) => vec(
  el.cx.baseVal.value,
  el.cy.baseVal.value,
);
const setPos = (el, [x, y]) => {
  el.cx.baseVal.value = x;
  el.cy.baseVal.value = y;
}
const a = getPos(c0);
const b = getPos(c1);
r.addEventListener("change", () => {
  const t = r.valueAsNumber;
  setPos(c2, lerp(a, b, t));
  setPos(c3, slerp(a, b, t));
});