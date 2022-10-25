const { bench } = Deno;
type n = number;
type v2 = [n, n];
type v3 = [n, n, n];
type v4 = [n, n, n, n];
type v = n[];
import { dot as dot2, vec as vec2 } from "../vec2.ts";
import { dot as dot3, vec as vec3 } from "../vec3.ts";
import { dot as dot4, vec as vec4 } from "../vec4.ts";

const dot2B = ([a, b]: v2, [c, d]: v2) => a * c + b * d;
const dot2C = (a: v2, b: v2) => a.reduce((a, c, i) => b[i] * c + a, 0);

const v2A = vec2(4, 5);
const v2B = vec2(7, 9);

bench("Dot2", { group: "dot 2D", baseline: true }, () => {
  dot2(v2A, v2B);
});
bench("Dot2 B", { group: "dot 2D" }, () => {
  dot2B(v2A, v2B);
});
bench("Dot2 C", { group: "dot 2D" }, () => {
  dot2C(v2A, v2B);
});

const dot3B = ([a, b, c]: v3, [d, e, f]: v3) => a * d + b * e + c * f;
const dot3C = (a: v3, b: v3) => a.reduce((a, c, i) => b[i] * c + a, 0);

const v3A = vec3(4, 5, 8);
const v3B = vec3(7, 9, 1);

bench("Dot3", { group: "dot 3D", baseline: true }, () => {
  dot3(v3A, v3B);
});
bench("Dot3 B", { group: "dot 3D" }, () => {
  dot3B(v3A, v3B);
});
bench("Dot3 C", { group: "dot 3D" }, () => {
  dot3C(v3A, v3B);
});

const dot4B = (
  [a, b, c, d]: v,
  [e, f, g, h]: v,
) => a * e + b * f + c * g + d * h;

const dot4C = (a: v4, b: v4) => a.reduce((a, c, i) => b[i] * c + a, 0);

const v4A = vec4(0, 4, 5, 8);
const v4B = vec4(7, 0, 9, 1);

bench("Dot4", { group: "dot 4D", baseline: true }, () => {
  dot4(v4A, v4B);
});
bench("Dot4 B", { group: "dot 4D" }, () => {
  dot4B(v4A, v4B);
});
bench("Dot4 C", { group: "dot 4D" }, () => {
  dot4C(v4A, v4B);
});
