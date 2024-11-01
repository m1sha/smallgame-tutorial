export default /*glsl*/`

in vec4 vPosition;
out vec4 fragColor;

void main() {
  
  vec2 uv = gl_FragCoord.xy / vec2(800.0, 800.0) * 2.0 - 1.0;
  float d = length(uv);
  
  fragColor = vec4(d, 0.0, d, 1.0);
}

`