#version 300 es
precision highp float;
uniform Uniforms{
  vec2 res;
  vec2 pan;
  float zoom;
};
in vec4 vCol;
in vec4 vUV;
out vec4 fCol;

void main(){
  vec2 uv=vUV.xy;
  vec2 g=2.*vec2((vUV.z/vUV.w)*min(uv.x,1.-uv.x),uv.y)-1.;
  float d=mix(length(g),abs(g.y),step(0.,g.x));
  float a=vCol.a*smoothstep(0.,4./(vUV.w*res.x*zoom),1.-d);
  fCol=vec4(vCol.rgb*a,a);
}