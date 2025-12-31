export default /*glsl*/`

out vec4 fragColor;
uniform float uTime;
uniform vec2 uResolution;
uniform vec4 uMouse;
uniform vec2 uOffest;
//uniform vec2 u_cellSize;


void main() {
  //vec2 uv = (gl_FragCoord.xy + uMouse.xy + uOffest.xy) / uResolution.xy;  //(gl_FragCoord.xy - .5 * uResolution.xy) / uResolution.y;
  //vec2 colsrows = uResolution.xy / u_cellSize;
  //vec2 textcoord = mod(floor(uv * colsrows), 2.);
  //float delta = abs(textcoord.x - textcoord.y);
  // if (gl_FragCoord.x < 10.) {
  //   fragColor =vec4(0.3,0.,0.,.0);
  //   return;
  // }
  fragColor =vec4(0.,0.1,0.,.1);
}

`