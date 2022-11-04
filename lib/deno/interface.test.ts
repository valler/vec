import { assertEquals, test } from "./dev.ts";
import * as vec from "./vec.ts";
import * as vec2 from "./vec2.ts";
import * as vec3 from "./vec3.ts";
import * as vec4 from "./vec4.ts";
import * as dot2 from "./dot2.ts";
import * as line2 from "./line2.ts";
type b = boolean;
type n = number;
type v = n[];
type m = v[];
type i<t> = {
  set(...a: v): t;
  id(a: t): t;
  isEqual(a: t, b: t): b;
  isValid(a: unknown): b;
};
interface iVec extends i<v> {
  neg(a: v): v;
  add(a: v, b: v): v;
  sub(a: v, b: v): v;
  mul(a: v, b: v): v;
  div(a: v, b: v): v;
  pow(a: v, b: v): v;
  mad(a: v, b: v, c: v): v;
  sAdd(a: v, b: n): v;
  sSub(a: v, b: n): v;
  sMul(a: v, b: n): v;
  sDiv(a: v, b: n): v;
  sPow(a: v, b: n): v;
  sMad(a: v, b: n, c: n): v;
  dot(a: v, b: v): n;
  sqrLen(a: v): n;
  len(a: v): n;
  dir(a: v): v;
  sqrDist(a: v, b: v): n;
  dist(a: v, b: v): n;
  area(a: v, b: v): n;
  sum(a: v): v;
  pro(a: v): v;
  coefSum(a: v): n;
  coefPro(a: v): n;
  proj(a: v, b: v): v;
  rej(a: v, b: v): v;
  refl(a: v, b: v): v;
  conj(a: v, b: v): v;
  rot(a: v, b: v, c: v): v;
  lerp(a: v, b: v, c: n): v;
  lerpFromTo(a: v, b: v, c: n): m;
  mix(a: v, b: v, c: v): v;
  slerp(a: v, b: v, c: n): v;
  slerpFromTo(a: v, b: v, c: n): m;
}
interface iVecN extends iVec {
  basis: m;
  sca(a: n): v;
  zero: v;
  one: v;
}
interface iVecGen extends iVec {
  basis(d: n): m;
  sca(d: n): (a: n) => v;
  zero(d: n): v;
  one(d: n): v;
}
interface iQuad<A, As> {
  stride: n;
  fromArray(a: A[]): As;
  join(a: As, b: As): As;
  fromVecs(a: v[], b: n, c: n, d: n, e: n, f: n): As;
}
type BaseQuad = {
  vertices: v;
};
interface oQuad extends BaseQuad {
  indices: [0, 1, 2, 2, 1, 3];
}
interface oQuads extends BaseQuad {
  indices: n[];
}
interface BaseDot {
  stride: 7;
  attribs: [
    { name: "col"; dim: 4 },
    { name: "pos"; dim: 2 },
    { name: "size"; dim: 1 },
  ];
}
interface oDot extends oQuad, BaseDot {}
interface oDots extends oQuads, BaseDot {}
interface iDot extends i<oDot>, iQuad<oDot, oDots> {
  stride: 7;
}
interface BaseLine {
  stride: 9;
  attribs: [
    { name: "col"; dim: 4 },
    { name: "pos"; dim: 4 },
    { name: "size"; dim: 1 },
  ];
}
interface oLine extends oQuad, BaseLine {}
interface oLines extends oQuads, BaseLine {}
interface iLine extends i<oLine>, iQuad<oLine, oLines> {
  stride: 9;
  toPath(a: m, b: n, c: n, d: n, e: n, f: n): oLines;
}

const iVecGen = (a: iVecGen) => a;
const iVecN = (a: iVecN) => a;
const iDot = (a: iDot) => a;
const iLine = (a: iLine) => a;
test("interface", () => {
  assertEquals(vec, iVecGen(vec));
  assertEquals(vec2, iVecN(vec2));
  assertEquals(vec3, iVecN(vec3));
  assertEquals(vec4, iVecN(vec4));
  assertEquals(dot2, iDot(dot2));
  assertEquals(line2, iLine(line2));
});
