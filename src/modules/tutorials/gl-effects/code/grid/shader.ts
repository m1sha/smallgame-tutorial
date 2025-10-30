export default /*glsl*/`
uniform float time;
uniform vec2 iResolution;
uniform vec4 iMouse;
uniform vec2 iMouseShift;
uniform vec2 iEndPos;
out vec4 fragColor;

float sdBox( in vec2 p, in vec2 b )
{
  vec2 d = abs(p)-b;
  return length(max(d,0.0)) + min(max(d.x,d.y),0.0);
}

float lerp(float a, float b, float amount) {
  return a + (b - a) * amount;
}

vec2 getPos(vec2 point) {
  return (point / iResolution.xy) - 0.5;
}

const vec4 blackColor = vec4(0.0, 0.0, 0.0, 1.0);
const vec4 axisesCrossColor = vec4(0.55, 0.55, 0.55, 0.8);
const vec4 axisesCrossColor2 = vec4(0.25, 0.25, 0.25, 0.8);
const vec4 bgColor = vec4(0.1, 0.1, 0.1, 1.0);
const vec4 cellColor = vec4(0.2, 0.2, 0.2, 1.0);
const float dZero = 0.00001;


vec4 gridLine (float a, float px) {
 
  //float h_step = -0.4375;

  float h_step = 2.0 / 16.0 - 0.5;
  
  //for (float i = 0.0; i < 16.0; i++) {
    if ( a < px + h_step && a > h_step - dZero) {
      return h_step >= -0.0 && h_step <= 0.0 ? axisesCrossColor : axisesCrossColor2;
    } 
    //h_step += 0.0625;
  //}
  return blackColor;

}

bool grid (vec2 st) {
 vec2 px =  1.0 / iResolution.xy;

 vec4 color = gridLine(st.x, px.x);
  if (color.r > dZero) {
    fragColor = color;
    return false;
  }

  color = gridLine(st.y, px.y);
  if (color.r > dZero) {
    fragColor = color;
    return false;
  }

  return true;
}

void main() {
  vec2 st = getPos(gl_FragCoord.xy);
  vec2 px =  1.0 / iResolution.xy;


  if (!grid(st)) {
    return;
  }


  if (iMouse.z < 0.01) {
    vec2 et = getPos(iEndPos.xy);
    st.x += et.x;
    st.y -= et.y;
  }

  vec2 M = getPos(iMouse.xy);
  if (iMouse.z > 0.0) {
    //st -= M;
    st.x += M.x;
    st.y -= M.y; // lerp(st.y, M.y, smoothstep(0.1, 0.6, time));
  }

  float zoom = abs(iMouse.w ) + 1.0;
  vec2 uv = fract(st * zoom) - 0.5;
  // vec2 uv = st;

  float zoomStep = zoom;

  float v = step(sdBox(uv, vec2(px.x * 20.0 * zoomStep, px.y * 20.0 * zoomStep)), 0.0001);

  if (v <= 0.0) {
    fragColor = bgColor;
    return;
  } 

  fragColor = cellColor;
}
`