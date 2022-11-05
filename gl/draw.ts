import type { B as Dots } from "../lib/js/dot2.js";
import type { B as Lines } from "../lib/js/line2.js";
import { v as v4 } from "../lib/js/vec4.js";
import { getElementColor, hasDevicePixelContentBox } from "./utils.js";

const shaderCompiler = (
  g: WebGL2RenderingContext,
  p: WebGLProgram,
) => (type: number, s: string) => {
  const sh = g.createShader(type);
  if (!sh) return;
  g.shaderSource(sh, s);
  g.compileShader(sh);
  g.attachShader(p, sh);
};

const enableAttribs = (
  gl: WebGL2RenderingContext,
  p: WebGLProgram,
  vao: WebGLVertexArrayObject,
  vBuf: WebGLBuffer,
  attribs: { name: string; dim: number; }[],
  stride: number,
  glType: number,
  glSize: number,
) => {
  const gla = gl.ARRAY_BUFFER;
  gl.bindVertexArray(vao);
  gl.bindBuffer(gla, vBuf);
  let i = 0;
  const s = glSize * stride;
  for (const { name: n, dim: d } of attribs) {
    const l = gl.getAttribLocation(p, n);
    gl.enableVertexAttribArray(l);
    gl.vertexAttribPointer(l, d, glType, false, s, i * glSize);
    i += d;
  }
  gl.bindBuffer(gla, null);
  gl.bindVertexArray(null);
};

const updateVertices = (
  gl: WebGL2RenderingContext,
  buf: WebGLBuffer,
  vertices: number[]
) => {
  const gla = gl.ARRAY_BUFFER;
  gl.bindBuffer(gla, buf);
  gl.bufferData(gla, new Float32Array(vertices), gl.DYNAMIC_DRAW);
  gl.bindBuffer(gla, null);
};

export const draw = async (
  ca: HTMLElement | null,
  vertexShaderSource: Promise<string>,
  fragmentShaderSource: Promise<string>,
  geometry: Promise<Dots> | Promise<Lines>,
  options?: { zoom: number },
) => {
  if (!(ca instanceof HTMLCanvasElement)) {
    return;
  }
  const gl = ca.getContext("webgl2");
  if (!gl) return;
  const pro = gl.createProgram();
  if (!pro) return;
  const vao = gl.createVertexArray();
  if (!vao) return;
  const vBuf = gl.createBuffer();
  if (!vBuf) return;
  const iBuf = gl.createBuffer();
  if (!iBuf) return;
  const uBuf = gl.createBuffer();
  if (!uBuf) return;

  const { round } = Math;
  const dpr = devicePixelRatio;
  let width = round(ca.clientWidth * dpr);
  let height = round(ca.clientHeight * dpr);
  let { zoom = 1 } = options || {};
  let panX = 0;
  let panY = 0;
  let roll = 0;

  const [vs, fs, geo, hasDPCB] = await Promise.all([
    vertexShaderSource,
    fragmentShaderSource,
    geometry,
    hasDevicePixelContentBox(),
  ]);
  const { attribs, stride, indices, vertices } = geo;

  hasDPCB ?
    (new ResizeObserver(([{ devicePixelContentBoxSize }]) => {
      const [box] = devicePixelContentBoxSize;
      width = box.inlineSize;
      height = box.blockSize;
      raf();
    })).observe(ca)
    : (new ResizeObserver(() => {
      width = round(ca.clientWidth * dpr);
      height = round(ca.clientHeight * dpr);
      raf();
    })).observe(ca);

  const compileShader = shaderCompiler(gl, pro);
  compileShader(gl.VERTEX_SHADER, vs);
  compileShader(gl.FRAGMENT_SHADER, fs);
  gl.linkProgram(pro);
  const ubo = 0;
  const uniforms = new Float32Array([width, height, panX, panY, roll, zoom, 0, 0]);
  const {
    TRIANGLES: tri,
    DYNAMIC_DRAW: dd,
    ARRAY_BUFFER: gla,
    UNIFORM_BUFFER: glu,
    ELEMENT_ARRAY_BUFFER: gli,
    UNSIGNED_INT: indexType,
  } = gl;

  updateVertices(gl, vBuf, vertices);
  gl.bindBuffer(gli, iBuf);
  gl.bufferData(gli, new Uint32Array(indices), dd);
  gl.bindBuffer(gli, null);
  gl.bindBufferBase(glu, ubo, uBuf);
  gl.bufferData(glu, uniforms, dd);
  gl.bindBuffer(glu, null);

  enableAttribs(
    gl,
    pro,
    vao,
    vBuf,
    attribs,
    stride,
    gl.FLOAT,
    Float32Array.BYTES_PER_ELEMENT,
  );
  gl.uniformBlockBinding(
    pro,
    gl.getUniformBlockIndex(pro, "Uniforms"),
    ubo,
  );

  gl.clearColor(0, 0, 0, 0);
  gl.disable(gl.DEPTH_TEST);
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

  const clearValue = gl.COLOR_BUFFER_BIT;
  const count = indices.length;
  let isRendering = false;
  const render = () => {
    isRendering = false;
    ca.width = width;
    ca.height = height;
    uniforms[0] = width;
    uniforms[1] = height;
    uniforms[2] = panX;
    uniforms[3] = panY;
    uniforms[4] = roll;
    uniforms[5] = zoom;
    gl.viewport(0, 0, width, height);
    gl.clear(clearValue);
    gl.useProgram(pro);
    gl.bindVertexArray(vao);
    gl.bindBuffer(gla, vBuf);
    gl.bindBuffer(gli, iBuf);
    gl.bindBuffer(glu, uBuf);
    gl.bufferData(glu, uniforms, dd);
    gl.drawElements(tri, count, indexType, 0);
    gl.bindBuffer(glu, null);
    gl.bindBuffer(gli, null);
    gl.bindBuffer(gla, null);
    gl.bindVertexArray(null);
    gl.useProgram(null);
    
    // Workaround Chrome fullscreen bug.
    // Canvas would not render the second frame, sometimes multiple frames.
    document.documentElement.style.backgroundColor = getComputedStyle(document.body).backgroundColor;
  }
  const raf = () => {
    if (isRendering) return;
    isRendering = true;
    requestAnimationFrame(render);
  }

  type themeChangeListener = (x: v4) => void;
  let themeChangeListeners: themeChangeListener[];
  const colorScheme = matchMedia("(prefers-color-scheme: dark)");
  colorScheme.addEventListener("change", (e) => {
    for (const f of themeChangeListeners) {
      f(getElementColor(ca));
    }
  });

  // Firefox and Safari need this for printing instead of requestAnimationFrame
  const renderPrint = () => {
    isRendering = true; // 1
    for (const f of themeChangeListeners) {
      f(getElementColor(ca));
    }
    render(); // 2
  }
  // In this case Chrome needs print events instead of match media
  addEventListener("beforeprint", () => {
    ca.classList.add("print");
    renderPrint();
  });
  addEventListener("afterprint", () => {
    ca.classList.remove("print");
    renderPrint();
  });

  return {
    onThemeChange: (x: themeChangeListener[]) => {
      themeChangeListeners = x;
    },
    updateVertices: (x: number[]) => {
      updateVertices(gl, vBuf, x);
      raf();
    },
    panX: (x: number) => {
      panX = x;
      raf();
    },
    panY: (x: number) => {
      panY = x;
      raf();
    },
    roll: (x: number) => {
      roll = x;
      raf();
    },
    zoom: (x: number) => {
      zoom = x;
      raf();
    },
  };
};
