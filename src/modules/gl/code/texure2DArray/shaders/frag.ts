export default /*glsl*/`

uniform mediump sampler2DArray u_sampler2D_1;

in  vec2 v_TexCoord;
out vec4 fragColor;

void main() {
  vec4 colorA = texture(u_sampler2D_1, vec3(v_TexCoord, 0.0));
  vec4 colorB = texture(u_sampler2D_1, vec3(v_TexCoord, 1.0));
  fragColor = colorA + colorB;  
}

`