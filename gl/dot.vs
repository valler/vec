#version 300 es
uniform Uniforms{
  vec2 res;
  vec2 pan;
  float roll;
  float zoom;
};
in vec2 pos;
in float size;
in vec4 col;
out vec4 vCol;
out vec3 vUV;
vec2 view(vec2 p){
  vec2 e =vec2(1,0);
  vec2 r = vec2(cos(roll),sin(roll));
  p+=reflect(reflect(pan,r),e);
  return (reflect(reflect(p,e),r))*vec2(res.y/res.x,1)*zoom;
}
void main(){
  vCol=col;
  float r=size/zoom;
  vUV=vec3(ivec2(gl_VertexID%2,gl_VertexID/2%2),r);
  vec2 p=r*(2.*vUV.xy-1.)+pos;
  gl_Position=vec4(view(p),0,1);
}