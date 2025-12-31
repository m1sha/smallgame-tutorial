export default /*glsl*/`

uniform sampler2D uSampler;
in vec2 vTexCoord;
out vec4 fragColor;

void main() {
  vec2 texSize = vec2(textureSize(uSampler, 0));
  vec2 uv =  vec2(gl_PointCoord.x, 1. - gl_PointCoord.y);
  
  uv /= texSize;
  uv *= 16.;
  uv.x += vTexCoord.x;
  uv.y -= vTexCoord.y;
  fragColor = texture(uSampler, uv);
  //vec4 color = vec4(0.8, 0.1, 0.2, 1.0);
  //fragColor = color; 
}
`