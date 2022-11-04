#version 300 es
precision highp float;
uniform Uniforms{
  vec2 res;
  vec2 pan;
  float zoom;
};
in vec4 vCol;
in vec3 vUV;
out vec4 fCol;
void main(){
  vec2 p=2.*vUV.xy-1.;
  float d=length(p);
  float a=vCol.a*smoothstep(0.,4./(vUV.z*res.x*zoom),1.-d);
  fCol=vec4(vCol.rgb*a,a);
}