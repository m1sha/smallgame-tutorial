export default /*glsl*/`
in float vColor;
out vec4 fragColor;

void main() {
  vec4 color = vec4(vec3(vColor), 1.0);
  fragColor = color; 
}
`