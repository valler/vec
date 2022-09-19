import { assertEquals, test } from "./dev.ts";
import {
  add,
  dot,
  e1,
  e2,
  e3,
  id,
  isEqual,
  mag,
  mag2,
  mul,
  neg,
  normalize,
  one,
  sAdd,
  sMul,
  sub,
  sum,
  vec,
  zero,
} from "./vec3.ts";

test("vec", () => {
  assertEquals(vec(1, 0, 0), [1, 0, 0]);
});

test("id", () => {
  assertEquals(id(e1()), e1());
});

test("isEqual", () => {
  assertEquals(isEqual(e1(), e1()), true);
  assertEquals(isEqual(e1(), e2()), false);
});

test("zero", () => {
  assertEquals(zero(), [0, 0, 0]);
});

test("one", () => {
  assertEquals(one(), [1, 1, 1]);
});

test("e1", () => {
  assertEquals(e1(), [1, 0, 0]);
});

test("e2", () => {
  assertEquals(e2(), [0, 1, 0]);
});

test("e3", () => {
  assertEquals(e3(), [0, 0, 1]);
});

test("add", () => {
  assertEquals(add(one(), zero()), one());
});

test("sum", () => {
  assertEquals(
    sum([e1(), e1(), e1(), e1()]),
    add(
      add(e1(), e1()),
      add(e1(), e1()),
    ),
  );
});

test("sMul", () => {
  assertEquals(sMul(3, e1()), sum([e1(), e1(), e1()]));
});

test("sAdd", () => {
  assertEquals(
    sAdd(3, e1()),
    add(sMul(3, one()), e1()),
  );
});

test("neg", () => {
  assertEquals(neg(one()), sMul(-1, one()));
});

test("sub", () => {
  assertEquals(
    sub(one(), e1()),
    add(one(), neg(e1())),
  );
});

test("mul", () => {
  assertEquals(mul(zero(), one()), zero());
  assertEquals(mul(e1(), e2()), zero());
  assertEquals(mul(e1(), e1()), e1());
  assertEquals(mul(one(), e1()), e1());
});

test("dot", () => {
  assertEquals(dot(e1(), e1()), 1);
  assertEquals(dot(e1(), e2()), 0);
  assertEquals(dot(e1(), neg(e1())), -1);
});

test("mag2", () => {
  assertEquals(mag2(zero()), 0);
  assertEquals(mag2(e1()), 1);
  assertEquals(mag2(neg(e1())), 1);
  assertEquals(mag2(sMul(2, e1())), 4);
  assertEquals(
    mag2(add(
      sMul(3, e1()),
      sMul(4, e2()),
    )),
    25,
  );
});

test("mag", () => {
  const v = add(
    sMul(3, e1()),
    sMul(4, e2()),
  );
  assertEquals(
    mag(v),
    Math.sqrt(mag2(v)),
  );
});

test("normalize", () => {
  assertEquals(
    mag(normalize(sMul(2, e1()))),
    1,
  );
});
