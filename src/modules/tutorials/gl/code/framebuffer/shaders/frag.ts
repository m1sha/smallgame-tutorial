export default /*glsl*/`

in vec3 vColor;
layout(location=0) out vec4 fragColor;
layout(location=1) out vec4 solidColor;

void main() {
  fragColor = vec4(vColor, 0.8);  
  solidColor = vec4(0.5, 0.1, 0.4, 0.8);  
}

`