import { assertEquals, test } from "./dev.ts";
import * as vec from "./vec.ts";
import * as vec2 from "./vec2.ts";
import * as vec3 from "./vec3.ts";
import * as vec4 from "./vec4.ts";

type n = number;

type vec = {
  vec(...a: n[]): n[];
  isEqual(a: n[], b: n[]): boolean;
  id(a: n[]): n[];
  neg(a: n[]): n[];
  add(a: n[], b: n[]): n[];
  sub(a: n[], b: n[]): n[];
  mul(a: n[], b: n[]): n[];
  div(a: n[], b: n[]): n[];
  pow(a: n[], b: n[]): n[];
  mad(a: n[], b: n[], c: n[]): n[];
  sAdd(a: n[], b: n): n[];
  sSub(a: n[], b: n): n[];
  sMul(a: n[], b: n): n[];
  sDiv(a: n[], b: n): n[];
  sPow(a: n[], b: n): n[];
  sMad(a: n[], b: n, c: n): n[];
  dot(a: n[], b: n[]): n;
  sqrLen(a: n[]): n;
  len(a: n[]): n;
  dir(a: n[]): n[];
  sqrDist(a: n[], b: n[]): n;
  dist(a: n[], b: n[]): n;
  area(a: n[], b: n[]): n;
  sum(a: n[]): n[];
  pro(a: n[]): n[];
  coefSum(a: n[]): n;
  coefPro(a: n[]): n;
  proj(a: n[], b: n[]): n[];
  rej(a: n[], b: n[]): n[];
  refl(a: n[], b: n[]): n[];
  conj(a: n[], b: n[]): n[];
  rot(a: n[], b: n[], c: n[]): n[];
  lerp(a: n[], b: n[], c: n): n[];
  mix(a: n[], b: n[], c: n[]): n[];
  slerp(a: n[], b: n[], c: n): n[];
};

interface vecN extends vec {
  basis: n[][];
  sca(a: n): n[];
  zero: n[];
  one: n[];
}

interface vecGen extends vec {
  basis(d: n): n[][];
  sca(d: n): (a: n) => n[];
  zero(d: n): n[];
  one(d: n): n[];
}

const vg = (a: vecGen) => a;
const vn = (a: vecN) => a;

test("interface", () => {
  assertEquals(vec, vg(vec));
  assertEquals(vec2, vn(vec2));
  assertEquals(vec3, vn(vec3));
  assertEquals(vec4, vn(vec4));
});
