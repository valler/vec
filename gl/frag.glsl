#version 300 es
precision highp float;
uniform Uniforms {
  vec2 res;
  float zoom;
};
in vec4 vCol;
in vec2 vUV;
out vec4 fCol;
void main () {
  vec2 p = 2.*vUV - 1.;
  float d = length(p);
  float a = vCol.a * smoothstep(d, d+fwidth(d), 1.);
  fCol = vec4(vCol.rgb * a,a);
}