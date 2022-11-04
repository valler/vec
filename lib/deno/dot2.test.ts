import { assertEquals, test } from "./dev.ts";
import { A, Attribs, Indices } from "./dot2.ts";
import {
  fromArray,
  fromVecs,
  id,
  isEqual,
  isValid,
  join,
  set,
  stride,
} from "./dot2.ts";
import { lerpFromTo, one as p1, zero as p0 } from "./vec2.ts";

const indices: Indices = [0, 1, 2, 2, 1, 3];
const attribs: Attribs = [
  { name: "col", dim: 4 },
  { name: "pos", dim: 2 },
  { name: "size", dim: 1 },
];
const o = set(0, 0, 0, 0, 0, 0, 0);
const v = set(1, 1, 1, 1, 1, 1, 1);

test("set", () => {
  assertEquals(
    set(1, 2, .5, 1, 0, 1, .5),
    {
      stride,
      attribs,
      indices,
      // deno-fmt-ignore
      vertices: [
        1, 0, 1, .5, 1, 2, .5,
        1, 0, 1, .5, 1, 2, .5,
        1, 0, 1, .5, 1, 2, .5,
        1, 0, 1, .5, 1, 2, .5,
      ],
    },
  );
});

test("id", () => {
  assertEquals(id(v), v);
});

test("isEqual", () => {
  assertEquals(isEqual(v, v), true);
  assertEquals(isEqual(v, o), false);
});

test("isValid", () => {
  assertEquals(isValid(o), true);
  assertEquals(isValid(v), true);
  const x = {
    stride,
    attribs,
    indices,
    vertices: [0],
  };
  assertEquals(isValid(x), false);
});

test("fromArray", () => {
  assertEquals(
    fromArray([
      set(0, 0, .5, 1, 0, 1, .1),
      set(0, 1, .5, 1, 0, 1, .2),
      set(1, 0, .5, 1, 0, 1, .3),
      set(1, 1, .5, 1, 0, 1, .4),
    ]),
    {
      stride,
      attribs,
      // deno-fmt-ignore
      indices: [
        0, 1, 2, 2, 1, 3,
        4, 5, 6, 6, 5, 7,
        8, 9, 10, 10, 9, 11,
        12, 13, 14, 14, 13, 15,
      ],
      // deno-fmt-ignore
      vertices: [
        1, 0, 1, .1, 0, 0, .5,
        1, 0, 1, .1, 0, 0, .5,
        1, 0, 1, .1, 0, 0, .5,
        1, 0, 1, .1, 0, 0, .5,
        1, 0, 1, .2, 0, 1, .5,
        1, 0, 1, .2, 0, 1, .5,
        1, 0, 1, .2, 0, 1, .5,
        1, 0, 1, .2, 0, 1, .5,
        1, 0, 1, .3, 1, 0, .5,
        1, 0, 1, .3, 1, 0, .5,
        1, 0, 1, .3, 1, 0, .5,
        1, 0, 1, .3, 1, 0, .5,
        1, 0, 1, .4, 1, 1, .5,
        1, 0, 1, .4, 1, 1, .5,
        1, 0, 1, .4, 1, 1, .5,
        1, 0, 1, .4, 1, 1, .5,
      ],
    },
  );
});

test("fromVecs", () => {
  assertEquals(
    fromVecs(lerpFromTo(p0, p1, 4), .1, 1, 1, 1, 1),
    {
      stride,
      attribs,
      // deno-fmt-ignore
      indices: [
        0, 1, 2, 2, 1, 3,
        4, 5, 6, 6, 5, 7,
        8, 9, 10, 10, 9, 11,
        12, 13, 14, 14, 13, 15,
        16, 17, 18, 18, 17, 19,
      ],
      // deno-fmt-ignore
      vertices: [
        1, 1, 1, 1, 0, 0, 0.1,
        1, 1, 1, 1, 0, 0, 0.1,
        1, 1, 1, 1, 0, 0, 0.1,
        1, 1, 1, 1, 0, 0, 0.1,
        1, 1, 1, 1, 0.25, 0.25, 0.1,
        1, 1, 1, 1, 0.25, 0.25, 0.1,
        1, 1, 1, 1, 0.25, 0.25, 0.1,
        1, 1, 1, 1, 0.25, 0.25, 0.1,
        1, 1, 1, 1, 0.5, 0.5, 0.1,
        1, 1, 1, 1, 0.5, 0.5, 0.1,
        1, 1, 1, 1, 0.5, 0.5, 0.1,
        1, 1, 1, 1, 0.5, 0.5, 0.1,
        1, 1, 1, 1, 0.75, 0.75, 0.1,
        1, 1, 1, 1, 0.75, 0.75, 0.1,
        1, 1, 1, 1, 0.75, 0.75, 0.1,
        1, 1, 1, 1, 0.75, 0.75, 0.1,
        1, 1, 1, 1, 1, 1, 0.1,
        1, 1, 1, 1, 1, 1, 0.1,
        1, 1, 1, 1, 1, 1, 0.1,
        1, 1, 1, 1, 1, 1, 0.1,
      ],
    },
  );
});

test("join", () => {
  const a = fromArray([o, v]);
  const b = join(a, a);
  assertEquals(b, {
    stride,
    attribs,
    // deno-fmt-ignore
    indices: [
      0, 1, 2, 2, 1, 3,
      4, 5, 6, 6, 5, 7,
      8, 9, 10, 10, 9, 11,
      12, 13, 14, 14, 13, 15,
    ],
    // deno-fmt-ignore
    vertices: [
      0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0,
      1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1,
      0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0,
      1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1,
    ],
  });
});
