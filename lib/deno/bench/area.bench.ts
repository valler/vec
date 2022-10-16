const { bench } = Deno;
type n = number;
type v2 = [n, n];
type v3 = [n, n, n];
type v4 = [n, n, n, n];
type v = n[];
import {
  area as area2,
  dir as dir2,
  len as len2,
  rej as rej2,
  vec as vec2,
} from "../vec2.ts";
import {
  area as area3,
  dir as dir3,
  len as len3,
  rej as rej3,
  vec as vec3,
} from "../vec3.ts";
import {
  area as area4,
  dir as dir4,
  len as len4,
  rej as rej4,
  vec as vec4,
} from "../vec4.ts";
import { area, dir, len, rej, vec } from "../vec.ts";
const { sqrt } = Math;

const area2B = (a: v2, b: v2) => {
  const n = dir2(a);
  return len2(a) * len2(rej2(n, b));
};

const area2C = ([a, b]: v2, [e, f]: v2) => {
  const la = sqrt(a * a + b * b);
  const na = a / la;
  const nb = b / la;
  const s = -na * e - nb * f;
  const i = s * na + e;
  const j = s * nb + f;
  return la * sqrt(i * i + j * j);
};

export const area2D = (a: v2, b: v2) => {
  const la = sqrt(a.reduce((a, b) => b * b + a, 0));
  const il = 1 / la;
  const s = a.reduce((a, c, i) => a - il * c * b[i], 0);
  const sl = s * il;
  return la * sqrt(a.reduce((a, c, i) => {
    const d = sl * c + b[i];
    return d * d + a;
  }, 0));
};

const area2E = ([a, b]: v2, [e, f]: v2) => {
  const i = a * f - e * b;
  return sqrt(i * i);
};

const v2A = vec2(4, 5);
const v2B = vec2(7, 9);

bench("Area2", { group: "area 2D", "baseline": true }, () => {
  area2(v2A, v2B);
});
bench("Area2 B", { group: "area 2D" }, () => {
  area2B(v2A, v2B);
});
bench("Area2 C", { group: "area 2D" }, () => {
  area2C(v2A, v2B);
});
bench("Area3 D", { group: "area 2D" }, () => {
  area4D(v2A, v2B);
});
bench("Area2 E", { group: "area 2D" }, () => {
  area2E(v2A, v2B);
});

const area3B = (a: v3, b: v3) => {
  const n = dir3(a);
  return len3(a) * len3(rej3(n, b));
};

const area3C = ([a, b, c]: v3, [e, f, g]: v3) => {
  const la = sqrt(a * a + b * b + c * c);
  const na = a / la;
  const nb = b / la;
  const nc = c / la;
  const s = -na * e - nb * f - nc * g;
  const i = s * na + e;
  const j = s * nb + f;
  const k = s * nc + g;
  return la * sqrt(i * i + j * j + k * k);
};

export const area3D = (a: v3, b: v3) => {
  const la = sqrt(a.reduce((a, b) => b * b + a, 0));
  const il = 1 / la;
  const s = a.reduce((a, c, i) => a - il * c * b[i], 0);
  const sl = s * il;
  return la * sqrt(a.reduce((a, c, i) => {
    const d = sl * c + b[i];
    return d * d + a;
  }, 0));
};

const area3E = ([a, b, c]: v, [d, e, f]: v): n => {
  const g = a * e - b * d;
  const h = a * f - c * d;
  const i = b * f - c * e;
  return sqrt(g * g + h * h + i * i);
};

const v3A = vec3(4, 5, 8);
const v3B = vec3(7, 9, 1);

bench("Area3", { group: "area 3D", "baseline": true }, () => {
  area3(v3A, v3B);
});
bench("Area3 B", { group: "area 3D" }, () => {
  area3B(v3A, v3B);
});
bench("Area3 C", { group: "area 3D" }, () => {
  area3C(v3A, v3B);
});
bench("Area3 D", { group: "area 3D" }, () => {
  area4D(v3A, v3B);
});
bench("Area3 E", { group: "area 3D" }, () => {
  area3E(v3A, v3B);
});

const area4B = (a: v4, b: v4) => {
  const n = dir4(a);
  return len4(a) * len4(rej4(n, b));
};

const area4C = ([a, b, c, d]: v4, [e, f, g, h]: v4) => {
  const la = sqrt(a * a + b * b + c * c + d * d);
  const na = a / la;
  const nb = b / la;
  const nc = c / la;
  const nd = d / la;
  const s = -na * e - nb * f - nc * g - nd * h;
  const i = s * na + e;
  const j = s * nb + f;
  const k = s * nc + g;
  const l = s * nd + h;
  return la * sqrt(i * i + j * j + k * k + l * l);
};

export const area4D = (a: v, b: v) => {
  const la = sqrt(a.reduce((a, b) => b * b + a, 0));
  const il = 1 / la;
  const s = a.reduce((a, c, i) => a - il * c * b[i], 0);
  const sl = s * il;
  return la * sqrt(a.reduce((a, c, i) => {
    const d = sl * c + b[i];
    return d * d + a;
  }, 0));
};

const area4E = ([a, b, c, d]: v4, [e, f, g, h]: v4) => {
  const i = a * f - e * b;
  const j = a * g - e * c;
  const k = a * h - e * d;
  const l = b * g - f * c;
  const m = b * h - f * d;
  const n = c * h - g * d;
  return sqrt(i * i + j * j + k * k + l * l + m * m + n * n);
};

const v4A = vec4(0, 4, 5, 8);
const v4B = vec4(7, 0, 9, 1);

bench("Area4", { group: "area 4D", "baseline": true }, () => {
  area4(v4A, v4B);
});
bench("Area4 B", { group: "area 4D" }, () => {
  area4B(v4A, v4B);
});
bench("Area4 C", { group: "area 4D" }, () => {
  area4C(v4A, v4B);
});
bench("Area4 D", { group: "area 4D" }, () => {
  area4D(v4A, v4B);
});
bench("Area4 E", { group: "area 4D" }, () => {
  area4E(v4A, v4B);
});

const areaB = (a: v, b: v) => {
  const n = dir(a);
  return len(a) * len(rej(n, b));
};

const vA = vec(0, 4, 5, 8, 6, 3, 6, 8, 9, 1, 4, 5, 3, 1, 7, 7);
const vB = vec(7, 0, 9, 1, 6, 3, 8, 8, 8, 3, 2, 8, 5, 4, 3, 0);

bench("Area", { group: "area nD", baseline: true }, () => {
  area(vA, vB);
});
bench("Area B", { group: "area nD" }, () => {
  areaB(vA, vB);
});
