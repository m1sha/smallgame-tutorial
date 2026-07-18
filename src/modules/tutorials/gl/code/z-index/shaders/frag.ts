export default /*glsl*/`

in vec4 oColors;
out vec4 fragColor;

void main() {
  fragColor = vec4(oColors);  
}

`