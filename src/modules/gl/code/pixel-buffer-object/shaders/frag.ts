export default /*glsl*/`

uniform sampler2D u_sampler2D;
in  vec2 v_TexCoord;
out vec4 fragColor;

void main() {
  fragColor = texture(u_sampler2D, v_TexCoord);  
}

`