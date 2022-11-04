#version 300 es
uniform Uniforms{
  vec2 res;
  vec2 pan;
  float zoom;
};
in vec2 pos;
in float size;
in vec4 col;
out vec4 vCol;
out vec3 vUV;
void main(){
  vCol=col;
  float r = size/zoom;
  vUV=vec3(ivec2(gl_VertexID%2,gl_VertexID/2%2),r);
  vec2 p=r*(2.*vUV.xy-1.)+pos+pan;
  p*=vec2(res.y/res.x,1)*zoom;
  gl_Position=vec4(p,0,1);
}