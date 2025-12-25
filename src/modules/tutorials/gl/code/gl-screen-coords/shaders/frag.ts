export default /*glsl*/`

in float v_Color;
out vec4 fragColor;

void main() {
  
  fragColor = vec4(v_Color, v_Color, v_Color + 0.1, 0.8);  
}

`