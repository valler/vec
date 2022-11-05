#version 300 es
uniform Uniforms{
  vec2 res;
  vec2 pan;
  float roll;
  float zoom;
};
in vec4 pos;
in float size;
in vec4 col;
out vec4 vCol;
out vec4 vUV;
vec2 view(vec2 p){
  p=reflect(reflect(p,vec2(1,0)),vec2(cos(roll),sin(roll)))*vec2(res.y/res.x,1)*zoom;
  return p+pan;
}
void main(){
  vCol=col;
  vec2 uv=vec2(ivec2(gl_VertexID%2,gl_VertexID/2%2));
  vec2 n0=vec2(1,0);
  vec2 c1=pos.xy;
  vec2 c2=pos.zw;
  vec2 v=c2-c1;
  float dv=dot(v,v);
  float lv=sqrt(dv);
  vec2 n1=v/lv;
  vec2 n2=normalize(n0+n1);
  float r=size/zoom;
  float h=2.*r;
  float l=lv+h;
  vUV=vec4(uv,l,h);
  vec2 p=vec2(l,h)*uv-vec2(r);
  p=reflect(reflect(p,n0),n2)+c1;
  gl_Position=vec4(view(p),0,1);
}