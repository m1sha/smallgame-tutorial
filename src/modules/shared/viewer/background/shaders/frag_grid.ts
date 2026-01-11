export default /*glsl*/`

out vec4 fragColor;
uniform float uTime;
uniform vec2 uResolution;
uniform vec4 uMouse;
uniform vec2 uOffest;
uniform vec2 u_cellSize;

//const vec4 blackColor = vec4(0.0, 0.0, 0.0, 1.0);
//const vec4 axisesCrossColor = vec4(0.55, 0.55, 0.55, 0.8);
//const vec4 axisesCrossColor2 = vec4(0.25, 0.25, 0.25, 0.8);
//const vec4 bgColor = vec4(0.0, 0.0, 0.0, 0.0);
//const vec4 cellColor = vec4(0.2, 0.2, 0.2, 1.0);
//const float dZero = 0.00001;

void main() {
  vec2 uv = (gl_FragCoord.xy + uMouse.xy + uOffest.xy) / uResolution.xy;  //(gl_FragCoord.xy - .5 * uResolution.xy) / uResolution.y;



  uv = fract(uv * vec2(16.0, 8.0));
  
 
  float d = length(uv);
  float c = smoothstep(0.4, 2., d);


  vec2 div = fwidth(uv);
  vec2 ss = step(div, uv);
  float f =  min(ss.x, ss.y);

  // float r = smoothstep(0.4,0.1, color.r);
  // color.r *= r;
  // color.b -= 0.2;
  // color.g -= 0.1;
  


  

  fragColor = vec4(vec3(f - 1.), 1. - f) ;
}

`