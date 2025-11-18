export default /*glsl*/`

uniform float time;
out vec4 fragColor;
uniform vec2 iResolution;






void main() {
  vec2 uv = (gl_FragCoord.xy - .5 * iResolution.xy) / iResolution.y;
  //vec2 uv = (gl_FragCoord.xy / iResolution.xy - 0.5);
//  uv = fract(uv * vec2(8., 5.)) - 0.5;

  float d = 1. - length(uv) * 15.4;

  float c = 0.;

  if (gl_FragCoord.x >= .5) c = 5.;
  
  //fragColor = vec4(d, 0.,  0., 1.);
  fragColor = vec4(d + c + cos(time*c* .5) * 0.2 , d + c + cos(time*c* .5) * 0.4 - 0.7  ,  uv.x * log(time * d*c) + 0.2 * cos(time * d*c) , 1.);
  
}

`