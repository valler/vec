import { assertEquals, test } from "./dev.ts";
import {
  add,
  area,
  basis,
  coefPro,
  coefSum,
  conj,
  dir,
  dist,
  div,
  dot,
  id,
  isEqual,
  len,
  lerp,
  mad,
  mix,
  mul,
  neg,
  one,
  pow,
  pro,
  proj,
  refl,
  rej,
  rot,
  sAdd,
  sca,
  sDiv,
  slerp,
  sMad,
  sMul,
  sPow,
  sqrDist,
  sqrLen,
  sSub,
  sub,
  sum,
  vec,
  zero,
} from "./vec2.ts";

const { acos, sin } = Math;

const o = zero;
const v = one;
const v2 = sca(2);
const v3 = sca(3);
const [e0, e1] = basis;
const negV = neg(v);
const negE0 = neg(e0);
const negE1 = neg(e1);

test("zero", () => {
  assertEquals(o, sca(0));
});

test("one", () => {
  assertEquals(v, sca(1));
});

test("basis", () => {
  assertEquals(basis, [[1, 0], [0, 1]]);
});

test("vec", () => {
  assertEquals(
    vec(3, 4),
    sum(
      sMul(e0, 3),
      sMul(e1, 4),
    ),
  );
});

test("sca", () => {
  assertEquals(v3, sMul(v, 3));
});

test("isEqual", () => {
  assertEquals(isEqual(v, v), true);
  assertEquals(isEqual(v, o), false);
});

test("id", () => {
  assertEquals(id(v), v);
});

test("neg", () => {
  assertEquals(negV, sca(-1));
  assertEquals(neg(o), o);
  assertEquals(neg(negV), v);
});

test("add", () => {
  assertEquals(add(v, o), v);
});

test("sub", () => {
  assertEquals(
    sub(v, v),
    add(v, negV),
  );
});

test("mul", () => {
  assertEquals(mul(o, v), o);
  assertEquals(mul(e0, e1), o);
  assertEquals(mul(e0, e0), e0);
  assertEquals(mul(v, e0), e0);
  assertEquals(mul(v, v), v);
});

test("div", () => {
  assertEquals(
    div(vec(6, 3), v3),
    vec(2, 1),
  );
});

test("pow", () => {
  assertEquals(
    pow(vec(2, 3), vec(2, 3)),
    vec(4, 27),
  );
});

test("mad", () => {
  assertEquals(
    mad(v3, v2, v),
    add(mul(v3, v2), v),
  );
});

test("sAdd", () => {
  assertEquals(
    sAdd(v, 3),
    add(v, v3),
  );
});

test("sSub", () => {
  assertEquals(
    sSub(v, 3),
    sub(v, v3),
  );
});

test("sMul", () => {
  assertEquals(
    sMul(v, 3),
    sum(v, v, v),
  );
});

test("sDiv", () => {
  assertEquals(
    sDiv(v, 3),
    div(v, v3),
  );
});

test("sPow", () => {
  assertEquals(
    sPow(v, 3),
    pro(v, v, v),
  );
});

test("sMad", () => {
  assertEquals(
    sMad(v3, 2, 1),
    mad(v3, v2, v),
  );
});

test("dot", () => {
  assertEquals(dot(e0, e0), 1);
  assertEquals(dot(e0, e1), 0);
  assertEquals(dot(e0, negE0), -1);
  assertEquals(dot(negE0, negE1), 0);
  assertEquals(dot(v, v), 2);
});

test("sqrLen", () => {
  assertEquals(sqrLen(o), 0);
  assertEquals(sqrLen(e0), 1);
  assertEquals(sqrLen(negE0), 1);
  assertEquals(sqrLen(sMul(e0, 2)), 4);
  assertEquals(
    sqrLen(add(
      sMul(e0, 3),
      sMul(e1, 4),
    )),
    25,
  );
});

test("len", () => {
  const v = add(
    sMul(e0, 3),
    sMul(e1, 4),
  );
  assertEquals(
    len(v),
    Math.sqrt(sqrLen(v)),
  );
});

test("dir", () => {
  assertEquals(area(dir(v2), v2), 0);
  assertEquals(len(dir(sMul(e0, 2))), 1);
  assertEquals(len(dir(sMul(e0, -2))), 1);
});

test("dist", () => {
  assertEquals(
    dist(sMul(e0, 3), sMul(e1, 4)),
    5,
  );
});

test("sqrDist", () => {
  assertEquals(
    sqrDist(sMul(e0, 3), sMul(e1, 4)),
    25,
  );
});

test("area", () => {
  assertEquals(area(v, v), 0);
  assertEquals(area(v, negV), 0);

  assertEquals(area(e0, e1), 1);
  assertEquals(area(e1, negE0), 1);
  assertEquals(area(negE0, negE1), 1);
  assertEquals(area(negE1, e0), 1);

  assertEquals(area(e1, e0), 1);
  assertEquals(area(e0, negE1), 1);
  assertEquals(area(negE1, negE0), 1);
  assertEquals(area(negE0, e1), 1);

  assertEquals(area(e0, add(e0, e1)), 1);

  assertEquals(area(sMul(e0, 2), sMul(e1, 2)), 4);
});

test("sum", () => {
  assertEquals(
    sum(v, v, v, v),
    add(add(add(v, v), v), v),
  );
});

test("pro", () => {
  const a = vec(3, 1);
  const b = vec(1, 4);
  const c = vec(5, 1);
  const d = vec(1, 6);
  assertEquals(
    pro(a, b, c, d),
    mul(mul(mul(a, b), c), d),
  );
});

test("coefSum", () => {
  assertEquals(
    coefSum(vec(3, 4)),
    3 + 4,
  );
});

test("coefPro", () => {
  assertEquals(
    coefPro(vec(3, 4)),
    3 * 4,
  );
  assertEquals(
    coefPro(vec(0, 4)),
    0,
  );
});

test("proj", () => {
  assertEquals(
    proj(e0, v3),
    sMul(e0, dot(e0, v3)),
  );
});

test("rej", () => {
  assertEquals(
    rej(e0, v3),
    sub(v3, proj(e0, v3)),
  );
});

test("refl", () => {
  assertEquals(
    refl(e0, v3),
    sub(v3, sMul(proj(e0, v3), 2)),
  );
});

test("conj", () => {
  assertEquals(
    conj(e0, v3),
    add(v3, sMul(rej(e0, v3), -2)),
  );
});

test("refl", () => {
  assertEquals(
    rot(e0, e1, v3),
    refl(e1, refl(e0, v3)),
  );
});

test("lerp", () => {
  const t = 0.2;
  assertEquals(
    lerp(e0, e1, t),
    add(sMul(e0, 1 - t), sMul(e1, t)),
  );
});

test("mix", () => {
  const t = sca(0.2);
  assertEquals(
    mix(e0, e1, t),
    add(mul(e0, sub(v, t)), mul(e1, t)),
  );
});
test("slerp", () => {
  const t = 0.5;
  const x = acos(dot(e0, e1));
  assertEquals(
    slerp(e0, e1, t),
    sDiv(
      add(
        sMul(e0, sin(x * (1 - t))),
        sMul(e1, sin(x * t)),
      ),
      sin(x),
    ),
  );
});
