export default /*glsl*/`

out vec4 fragColor;
uniform vec2 u_FragColor;

void main() {
  fragColor = vec4(u_FragColor, 0.5, 1.0);  
}

`