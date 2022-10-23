import type { Dots } from "../lib/js/dot2.js";

export const render = (
  ca: HTMLCanvasElement,
  gl: WebGL2RenderingContext,
  vs: string,
  fs: string,
  { attribs, stride, indices, vertices }: Dots,
  { hasDPCB, zoom = 1 }: { hasDPCB: boolean, zoom?: number },
) => {
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
  const compileShader = shaderCompiler(gl, pro);
  compileShader(gl.VERTEX_SHADER, vs);
  compileShader(gl.FRAGMENT_SHADER, fs);
  gl.linkProgram(pro);

  let width = ca.clientWidth;
  let height = ca.clientHeight;
  const ubo = 0;
  const uniforms = new Float32Array([width, height, zoom, 0]);
  const {
    TRIANGLES: tri,
    DYNAMIC_DRAW: dd,
    ARRAY_BUFFER: gla,
    UNIFORM_BUFFER: glu,
    ELEMENT_ARRAY_BUFFER: gli,
    UNSIGNED_INT: indexType,
  } = gl;
  const updateVertices = (vertices: number[]) => {
    gl.bindBuffer(gla, vBuf);
    gl.bufferData(gla, new Float32Array(vertices), dd);
    gl.bindBuffer(gla, null);
  };
  updateVertices(vertices);
  gl.bindBuffer(gli, iBuf);
  gl.bufferData(gli, new Uint32Array(indices), dd);
  gl.bindBuffer(gli, null);
  gl.bindBufferBase(glu, ubo, uBuf);
  gl.bufferData(glu, uniforms, dd);
  gl.bindBuffer(glu, null);

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
  enableAttribs(
    gl,
    pro,
    vao,
    vBuf,
    attribs,
    stride,
    gl.FLOAT,
    4, // sizeof(gl.FLOAT)
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
  let requested = false;
  const render = () => {
    requested = false;
    ca.width = width;
    ca.height = height;
    uniforms[0] = width;
    uniforms[1] = height;
    uniforms[2] = zoom;
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
  }
  const raf = () => {
    if (requested) return;
    requested = true;
    requestAnimationFrame(render);
  }

  hasDPCB ?
    (new ResizeObserver(([{ devicePixelContentBoxSize }]) => {
      const [box] = devicePixelContentBoxSize;
      width = box.inlineSize;
      height = box.blockSize;
      raf();
    })).observe(ca, { box: "device-pixel-content-box" })
    : (new ResizeObserver(() => {
      const { round } = Math;
      width = round(ca.clientWidth * devicePixelRatio);
      height = round(ca.clientHeight * devicePixelRatio);
      raf();
    })).observe(ca);
  
    return {
      updateVertices: (x: number[]) => {
        updateVertices(x);
        raf();
      },
      zoom: (x: number) => {
        zoom = x;
        raf();
      },
    };
} 