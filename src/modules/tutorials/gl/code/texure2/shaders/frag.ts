export default /*glsl*/`

uniform sampler2D u_sampler2D_1;
uniform sampler2D u_sampler2D_2;
in  vec2 v_TexCoord;
out vec4 fragColor;

void main() {
  vec4 colorA = texture(u_sampler2D_1, v_TexCoord);
  vec4 colorB = texture(u_sampler2D_2, v_TexCoord);
  fragColor = colorA * colorB;  
}

`