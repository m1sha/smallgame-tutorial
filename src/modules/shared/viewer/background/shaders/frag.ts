export default /*glsl*/`

out vec4 fragColor;
uniform float uTime;
uniform vec2 uResolution;
uniform vec4 uMouse;
uniform vec2 uMouseShift;
uniform vec2 uOffest;
uniform float uZoom;
uniform vec2 u_cellSize;


void main() {
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  uv = uv + uOffest / uResolution.xy;
  uv = uv / uZoom;
  uv = uv - uMouseShift; 
  vec2 colsrows = uResolution.xy / (u_cellSize * uZoom);
  vec2 textcoord = mod(floor(uv * colsrows), 2.0);
  float delta = abs(textcoord.x - textcoord.y);
  vec4 color1 = mix(vec4(0.02), vec4(0.06), delta);

  vec2 gridScale = u_cellSize * uZoom;
  vec2 gridCoord = uv * gridScale;
  vec2 cellCoord = floor(gridCoord);
  vec2 fracCoord = fract(gridCoord);
  float lineX = smoothstep(0.05, 0.0, fracCoord.x);
  float lineY = smoothstep(0.05, 0.0, fracCoord.y);
  float line = max(lineX, lineY);
  vec4 lineColor = vec4(0.3, 0.3, 0.3, 1.0); // Цвет линий
  vec4 bgColor = vec4(0.0, 0.0, 0.0, .0);   // Цвет фона
  vec4 color2 = mix(bgColor, lineColor, line);

  fragColor  = color1;// + color2;

  //vec2 uv = (gl_FragCoord.xy + uMouse.xy + uOffest.xy) / uResolution.xy;  //(gl_FragCoord.xy - .5 * uResolution.xy) / uResolution.y;
  //vec2 colsrows = uResolution.xy / (u_cellSize * uZoom);
  //vec2 textcoord = mod(floor(uv * colsrows), 2.);
  //float delta = abs(textcoord.x - textcoord.y);
  //fragColor = mix(vec4(.02), vec4(.06), delta);
}

`