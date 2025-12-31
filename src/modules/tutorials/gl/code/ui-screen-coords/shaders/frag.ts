export default /*glsl*/`

uniform sampler2D uSampler;
//in vec2 v_TexCoord;
out vec4 fragColor;

void main() {
  vec2 texSize = vec2(textureSize(uSampler, 0));
  vec2 uv =  vec2(gl_PointCoord.x, 1. - gl_PointCoord.y);
  
  uv /= texSize;
  uv *= 16.;
  //uv.x += v_TexCoord.x;
  //uv.y -= v_TexCoord.y;

  fragColor = texture(uSampler, uv);
  //fragColor = vec4(uv, 0., 1.);
}

`