export default /*glsl*/`
uniform float time;
uniform vec2 iResolution;
uniform vec4 iMouse;
uniform vec2 iMouseShift;
uniform vec2 iEndPos;
out vec4 fragColor;


vec2 getPos(vec2 point) {
  return (point / iResolution.xy) - 0.5;
}

const vec4 blackColor = vec4(0.0, 0.0, 0.0, 1.0);
const vec4 axisesCrossColor = vec4(0.55, 0.55, 0.55, 0.8);
const vec4 axisesCrossColor2 = vec4(0.25, 0.25, 0.25, 0.8);
const vec4 bgColor = vec4(0.1, 0.1, 0.1, 1.0);
const vec4 cellColor = vec4(0.2, 0.2, 0.2, 1.0);
const float dZero = 0.00001;


void main() {

  vec2 st = getPos(gl_FragCoord.xy);
  vec2 px =  1.0 / iResolution.xy;

  if (iMouse.z < 0.01) {
    vec2 et = getPos(iEndPos.xy);
    st.x += et.x;
    st.y -= et.y;
  }

  vec2 M = getPos(iMouse.xy);
  if (iMouse.z > 0.0) {
    st.x += M.x;
    st.y -= M.y; 
  }

  float zoom = abs(iMouse.w + 1.0);

  st *= vec2(10.0 * zoom, 7.2 * zoom);

  

  


  vec2 grid10 = abs(fract(st * (1.0 / 8.0) - 0.5) - 0.5);
  grid10 /= fwidth(st * 0.1);
  float lines10 = 1.0 - min(min(grid10.x, grid10.y), 1.0);
                
  // Второстепенные линии (каждую единицу)
  vec2 grid1 = abs(fract(st - 0.5) - 0.5);
  grid1 /= fwidth(st);
  float lines1 = (1.0 - min(min(grid1.x, grid1.y), 1.0)) * 0.3;
                
  // Центральные оси
  float axisX = 1.0 - min(abs(st.x) / fwidth(st.x) * 0.5, 1.0);
  float axisY = 1.0 - min(abs(st.y) / fwidth(st.y) * 0.5, 1.0);
  float axes = max(axisX, axisY) * 0.2;
                
  // Комбинируем все элементы
  float alpha = max(max(lines10, lines1 * 0.6), axes);
                
  // Цвет в зависимости от типа линии
  vec3 color = mix(axisesCrossColor.rgb * 0.7, axisesCrossColor.rgb, lines10);
  color = mix(color, vec3(0.5, 0.2, 0.2), axisX);
  color = mix(color, vec3(0.2, 0.4, 0.2), axisY);
                
  // Затухание к краям
  //vec2 screenCoord = gl_FragCoord.xy / iResolution;
  //vec2 centerDist = abs(screenCoord - 0.5) * 2.0;
  //float fade = 1.0 - smoothstep(0.8, 1.0, max(centerDist.x, centerDist.y));
                
  fragColor = vec4(color, alpha * 1.0);
 
}
`