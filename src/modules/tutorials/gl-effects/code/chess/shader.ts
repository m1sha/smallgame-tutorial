export default /*glsl*/`

uniform float time;
out vec4 fragColor;
uniform vec2 iResolution;
uniform vec4 iMouse;
uniform vec2 u_cellSize;


void main() {
  vec2 uv = (gl_FragCoord.xy - iMouse.xy) / iResolution.xy;  //(gl_FragCoord.xy - .5 * iResolution.xy) / iResolution.y;

  
  vec2 colsrows = iResolution.xy / u_cellSize;
  
  vec2 textcoord = mod(floor(uv * colsrows), 2.);
  float delta = abs(textcoord.x - textcoord.y);
  fragColor = mix(vec4(.1), vec4(.24), delta);
}

`