export default /*glsl*/`

out vec4 fragColor;

void main() {
  
  fragColor = vec4(gl_PointCoord, 0.5, 0.8);  
}

`