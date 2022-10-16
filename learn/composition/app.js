import { vec, add } from "../../lib/js/vec2.js";
const d = document;
const [c0, c1, c2] = d.querySelectorAll("#svg circle");
const ranges = d.querySelectorAll("#ranges input");
const setPos = (el, [x, y]) => {
  el.cx.baseVal.value = x;
  el.cy.baseVal.value = y;
}
const update = () => {
  const a = vec(
    ranges[0].valueAsNumber,
    ranges[1].valueAsNumber,
  );
  const b = vec(
    ranges[2].valueAsNumber,
    ranges[3].valueAsNumber,
  );
  setPos(c0, a);
  setPos(c1, b);
  setPos(c2, add(a, b));
}
for (const r of ranges) {
  r.addEventListener("change", update);
}