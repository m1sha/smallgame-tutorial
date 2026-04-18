export default /*glsl*/`

out vec4 fragColor;
uniform vec3 u_FragColor;

void main() {
  fragColor = vec4(u_FragColor, 1.0);  
}

`