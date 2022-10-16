const { bench } = Deno;
type n = number;
type v2 = [n, n];
type v3 = [n, n, n];
type v4 = [n, n, n, n];
type v = n[];
import { len as len2, vec as vec2 } from "../vec2.ts";
import { len as len3, vec as vec3 } from "../vec3.ts";
import { len as len4, vec as vec4 } from "../vec4.ts";
import { len, vec } from "../vec.ts";
const { sqrt, hypot } = Math;

const len2B = (a: v2) => hypot(...a);
const len2C = ([a, b]: v2) => hypot(a, b);
const len2D = ([a, b]: v2) => sqrt(a * a + b * b);
const len2E = (a: v2) => sqrt(a.reduce((a, b) => b * b + a, 0));
const v2 = vec2(4, 5);
bench("Len2", { group: "length 2D", "baseline": true }, () => {
  len2(v2);
});
bench("Len2 B", { group: "length 2D" }, () => {
  len2B(v2);
});
bench("Len2 C", { group: "length 2D" }, () => {
  len2C(v2);
});
bench("Len2 C", { group: "length 2D" }, () => {
  len2D(v2);
});
bench("Len2 E", { group: "length 2D" }, () => {
  len2E(v2);
});

const len3B = (a: v3) => hypot(...a);
const len3C = ([a, b, c]: v3) => hypot(a, b, c);
const len3D = ([a, b, c]: v3) => sqrt(a * a + b * b + c * c);
const len3E = (a: v3) => sqrt(a.reduce((a, b) => b * b + a, 0));
const v3 = vec3(4, 5, 8);
bench("Len3", { group: "length 3D", "baseline": true }, () => {
  len3(v3);
});
bench("Len3 B", { group: "length 3D" }, () => {
  len3B(v3);
});
bench("Len3 C", { group: "length 3D" }, () => {
  len3C(v3);
});
bench("Len3 D", { group: "length 3D" }, () => {
  len3D(v3);
});
bench("Len3 E", { group: "length 3D" }, () => {
  len3E(v3);
});

const len4B = (a: v4) => hypot(...a);
const len4C = ([a, b, c, d]: v4) => hypot(a, b, c, d);
const len4D = ([a, b, c, d]: v4) => sqrt(a * a + b * b + c * c + d * d);
const len4E = (a: v4) => sqrt(a.reduce((a, b) => b * b + a, 0));
const v4 = vec4(0, 4, 5, 8);
bench("Len4", { group: "length 4D", "baseline": true }, () => {
  len4(v4);
});
bench("Len4 B", { group: "length 4D" }, () => {
  len4B(v4);
});
bench("Len4 C", { group: "length 4D" }, () => {
  len4C(v4);
});
bench("Len4 D", { group: "length 4D" }, () => {
  len4D(v4);
});
bench("Len4 E", { group: "length 4D" }, () => {
  len4E(v4);
});

const lenB = (a: v) => hypot(...a);
const lenC = (a: v) => sqrt(a.reduce((a, b) => b * b + a, 0));
const lenD = (a: v) => {
  let o = 0;
  for (const x of a) o += x * x;
  return sqrt(o);
};
const v = vec(0, 4, 5, 8, 6, 3, 6, 8, 9, 1, 4, 5, 3, 1, 7, 7);
bench("Len", { group: "length nD", baseline: true }, () => {
  len(v);
});
bench("Len B", { group: "length nD" }, () => {
  lenB(v);
});
bench("Len C", { group: "length nD" }, () => {
  lenC(v);
});
bench("Len D", { group: "length nD" }, () => {
  lenD(v);
});
