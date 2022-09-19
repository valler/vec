import { assertEquals, test } from "./dev.ts";
import * as vec2 from "./vec2.ts";
import * as vec3 from "./vec3.ts";
import * as vec4 from "./vec4.ts";

type n = number;
type v = {
  id(a: n[]): n[];
  isEqual(a: n[], b: n[]): boolean;
  zero(): n[];
  one(): n[];
  add(a: n[], b: n[]): n[];
  sum(a: n[][]): n[];
  sMul(s: n, b: n[]): n[];
  neg(a: n[]): n[];
  sub(a: n[], b: n[]): n[];
  mul(a: n[], b: n[]): n[];
  dot(a: n[], b: n[]): n;
  mag2(a: n[]): n;
  mag(a: n[]): n;
  normalize(a: n[]): n[];
};

const id = (a: v) => a;

test("interface", () => {
  assertEquals(vec2, id(vec2));
  assertEquals(vec3, id(vec3));
  assertEquals(vec4, id(vec4));
});
