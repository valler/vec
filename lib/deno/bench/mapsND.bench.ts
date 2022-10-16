const { bench } = Deno;
type n = number;
type v = n[];
import {
  add,
  div,
  mad,
  mul,
  neg,
  pow,
  sAdd,
  sDiv,
  sMad,
  sMul,
  sPow,
  sSub,
  sub,
  vec,
} from "../vec.ts";
const { pow: nPow } = Math;

const vA = vec(4, 4, 5, 8, 6, 3, 6, 8, 9, 1, 4, 5, 3, 1, 7, 7);
const vB = vec(7, 2, 9, 1, 6, 3, 8, 8, 8, 3, 2, 8, 5, 4, 3, 7);
const vC = vec(6, 4, 6, 7, 7, 7, 3, 4, 6, 8, 9, 2, 9, 2, 1, 3);
const sA = 3;
const sB = 4;

const vecMaps = [add, sub, mul, div, pow];

const addB = (a: v, b: v): v => a.map((x, i) => x + b[i]);
const subB = (a: v, b: v): v => a.map((x, i) => x - b[i]);
const mulB = (a: v, b: v): v => a.map((x, i) => x * b[i]);
const divB = (a: v, b: v): v => a.map((x, i) => x / b[i]);
const powB = (a: v, b: v): v => a.map((x, i) => nPow(x, b[i]));
const vecMapsB = [addB, subB, mulB, divB, powB];

const addC = (a: v, b: v) => {
  const o: v = [];
  const n = a.length;
  for (let i = 0; i < n; ++i) o.push(a[i] + b[i]);
  return o;
};
const subC = (a: v, b: v) => {
  const o: v = [];
  const n = a.length;
  for (let i = 0; i < n; ++i) o.push(a[i] - b[i]);
  return o;
};
const mulC = (a: v, b: v) => {
  const o: v = [];
  const n = a.length;
  for (let i = 0; i < n; ++i) o.push(a[i] * b[i]);
  return o;
};
const divC = (a: v, b: v) => {
  const o: v = [];
  const n = a.length;
  for (let i = 0; i < n; ++i) o.push(a[i] / b[i]);
  return o;
};
const powC = (a: v, b: v) => {
  const o: v = [];
  const n = a.length;
  for (let i = 0; i < n; ++i) o.push(nPow(a[i], b[i]));
  return o;
};
const vecMapsC = [addC, subC, mulC, divC, powC];

const scaMaps = [sAdd, sDiv, sMul, sPow, sSub];

const sAddB = (a: v, s: n): v => a.map((x) => x + s);
const sSubB = (a: v, s: n): v => a.map((x) => x - s);
const sMulB = (a: v, s: n): v => a.map((x) => x * s);
const sDivB = (a: v, s: n): v => a.map((x) => x / s);
const sPowB = (a: v, s: n): v => a.map((x) => nPow(x, s));
const scaMapsB = [sAddB, sDivB, sMulB, sPowB, sSubB];

const sAddC = (a: v, s: n) => {
  const o: v = [];
  const n = a.length;
  for (let i = 0; i < n; ++i) o.push(a[i] + s);
  return o;
};
const sSubC = (a: v, s: n) => {
  const o: v = [];
  const n = a.length;
  for (let i = 0; i < n; ++i) o.push(a[i] - s);
  return o;
};
const sMulC = (a: v, s: n) => {
  const o: v = [];
  const n = a.length;
  for (let i = 0; i < n; ++i) o.push(a[i] * s);
  return o;
};
const sDivC = (a: v, s: n) => {
  const o: v = [];
  const n = a.length;
  for (let i = 0; i < n; ++i) o.push(a[i] / s);
  return o;
};
const sPowC = (a: v, s: n) => {
  const o: v = [];
  const n = a.length;
  for (let i = 0; i < n; ++i) o.push(nPow(a[i], s));
  return o;
};
const scaMapsC = [sAddC, sDivC, sMulC, sPowC, sSubC];

const negB = (a: v): v => a.map((x) => -x);
const negC = (a: v) => {
  const o: v = [];
  const n = a.length;
  for (let i = 0; i < n; ++i) o.push(-a[i]);
  return o;
};

const madB = (a: v, b: v, c: v): v => a.map((x, i) => x * b[i] + c[i]);
const madC = (a: v, b: v, c: v): v => {
  const o: v = [];
  const n = a.length;
  for (let i = 0; i < n; ++i) o.push(a[i] * b[i] + c[i]);
  return o;
};

const sMadB = (a: v, b: n, c: n): v => a.map((x) => x * b + c);
const sMadC = (a: v, b: n, c: n): v => {
  const o: v = [];
  const n = a.length;
  for (let i = 0; i < n; ++i) o.push(a[i] * b + c);
  return o;
};

bench("Maps", { group: "maps nD", baseline: true }, () => {
  neg(vA);
  mad(vA, vB, vC);
  sMad(vA, sA, sB);
  for (const f of vecMaps) f(vA, vB);
  for (const f of scaMaps) f(vA, sA);
});
bench("Maps B", { group: "maps nD" }, () => {
  negB(vA);
  madB(vA, vB, vC);
  sMadB(vA, sA, sB);
  for (const f of vecMapsB) f(vA, vB);
  for (const f of scaMapsB) f(vA, sA);
});
bench("Maps C", { group: "maps nD" }, () => {
  negC(vA);
  madC(vA, vB, vC);
  sMadC(vA, sA, sB);
  for (const f of vecMapsC) f(vA, vB);
  for (const f of scaMapsC) f(vA, sA);
});
