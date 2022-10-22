#version 300 es
uniform Uniforms {
  vec2 res;
  float zoom;
};
in vec2 pos;
in float size;
in vec4 col;
out vec4 vCol;
out vec2 vUV;
void main () {
  vCol = col;
  vUV = vec2(ivec2(
    gl_VertexID % 2,
    gl_VertexID / 2 % 2
  ));
  vec2 p = size*(2.*vUV-1.)/zoom+pos;
  vec2 aspect = vec2(res.y/res.x, 1);
  p *= aspect*zoom;
  gl_Position = vec4(p, 0, 1);
}