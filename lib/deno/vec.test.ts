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
  lerpFromTo,
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
  slerpFromTo,
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
} from "./vec.ts";

const { acos, sin } = Math;

const d = 6;
const b = basis(d);
const o = zero(d);
const v = one(d);
const s = sca(d);
const v2 = s(2);
const v3 = s(3);
const [e0, e1, e2, e3, e4, e5] = b;
const negV = neg(v);
const [
  negE0,
  negE1,
  negE2,
  negE3,
  negE4,
  negE5,
] = b.map((x) => neg(x));

test("zero", () => {
  assertEquals(o, s(0));
});

test("one", () => {
  assertEquals(v, s(1));
});

test("basis", () => {
  assertEquals(b, [
    [1, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 1],
  ]);
});

test("vec", () => {
  assertEquals(
    vec(3, 4, 5, 6, 7, 8),
    sum(
      sMul(e0, 3),
      sMul(e1, 4),
      sMul(e2, 5),
      sMul(e3, 6),
      sMul(e4, 7),
      sMul(e5, 8),
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
  assertEquals(neg(v), s(-1));
  assertEquals(neg(o), o);
  assertEquals(neg(neg(v)), v);
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
    div(vec(18, 15, 12, 9, 6, 3), v3),
    vec(6, 5, 4, 3, 2, 1),
  );
});

test("pow", () => {
  assertEquals(
    pow(vec(1, 2, 3, 4, 5, 6), vec(1, 2, 3, 4, 5, 6)),
    vec(1, 4, 27, 256, 3125, 46656),
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
  assertEquals(dot(v, v), d);
});

test("sqrLen", () => {
  assertEquals(sqrLen(o), 0);
  assertEquals(sqrLen(e0), 1);
  assertEquals(sqrLen(negE0), 1);
  assertEquals(sqrLen(sMul(e0, 2)), 4);
  assertEquals(
    sqrLen(sum(
      sMul(e0, 2),
      sMul(e1, 3),
      sMul(e2, 4),
      sMul(e3, 5),
      sMul(e4, 6),
      sMul(e5, 7),
    )),
    139,
  );
});

test("len", () => {
  const v = sum(
    sMul(e0, 2),
    sMul(e1, 3),
    sMul(e2, 4),
    sMul(e3, 5),
    sMul(e4, 6),
    sMul(e5, 7),
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
  assertEquals(area(e1, e2), 1);
  assertEquals(area(e2, e3), 1);
  assertEquals(area(e3, e4), 1);
  assertEquals(area(e4, e5), 1);
  assertEquals(area(e5, negE0), 1);
  assertEquals(area(negE0, negE1), 1);
  assertEquals(area(negE1, negE2), 1);
  assertEquals(area(negE2, negE3), 1);
  assertEquals(area(negE3, negE4), 1);
  assertEquals(area(negE4, negE5), 1);
  assertEquals(area(negE5, e0), 1);

  assertEquals(area(e5, e4), 1);
  assertEquals(area(e4, e3), 1);
  assertEquals(area(e3, e2), 1);
  assertEquals(area(e2, e1), 1);
  assertEquals(area(e1, e0), 1);
  assertEquals(area(e0, negE5), 1);
  assertEquals(area(negE5, negE4), 1);
  assertEquals(area(negE4, negE3), 1);
  assertEquals(area(negE3, negE2), 1);
  assertEquals(area(negE2, negE1), 1);
  assertEquals(area(negE1, negE0), 1);
  assertEquals(area(negE0, e5), 1);

  assertEquals(area(e0, add(e0, e1)), 1);

  assertEquals(area(vec(1), vec(2)), 0);
  assertEquals(
    area(
      vec(3, 4, 12, 84, 0),
      vec(3, 4, 12, 84, 2),
    ),
    170,
  );
});

test("sum", () => {
  assertEquals(
    sum(v, v, v, v),
    add(add(add(v, v), v), v),
  );
});

test("pro", () => {
  const a = vec(0, 1, 2, 1, 1, 1);
  const b = vec(1, 1, 1, 3, 1, 1);
  const c = vec(1, 1, 1, 1, 4, 1);
  const d = vec(1, 1, 1, 1, 1, 5);
  assertEquals(
    pro(a, b, c, d),
    mul(mul(mul(a, b), c), d),
  );
});

test("coefSum", () => {
  assertEquals(
    coefSum(vec(3, 4, 5, 6, 7, 8)),
    3 + 4 + 5 + 6 + 7 + 8,
  );
});

test("coefPro", () => {
  assertEquals(
    coefPro(vec(3, 4, 5, 6, 7, 8)),
    3 * 4 * 5 * 6 * 7 * 8,
  );
  assertEquals(
    coefPro(vec(0, 4, 5, 6, 7, 8)),
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

test("lerpFromTo", () => {
  assertEquals(
    lerpFromTo(o, v, 4),
    [
      o,
      s(.25),
      s(.50),
      s(.75),
      v,
    ],
  );
});

test("mix", () => {
  const t = s(0.2);
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

test("slerpFromTo", () => {
  const n = 4;
  const o = [];
  for (let i = 0; i <= n; i++) {
    o.push(slerp(e0, e1, i / n));
  }
  assertEquals(
    slerpFromTo(e0, e1, n),
    o,
  );
});
