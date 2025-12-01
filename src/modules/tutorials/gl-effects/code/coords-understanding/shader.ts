export default /*glsl*/`

uniform float time;
out vec4 fragColor;
uniform vec2 iResolution;


vec2 toUV (vec2 point, vec2 resolution) {
  return vec2(point.x / resolution.x, 1.0 - point.y / resolution.y);
}



void main() {
  //vec2 uv = (gl_FragCoord.xy - .5 * iResolution.xy) / iResolution.y;

  float color = 0.;
 
  vec2 uv = toUV(gl_FragCoord.xy, iResolution.xy);

  vec2 uvPoint = toUV(vec2(32.0), iResolution.xy);
  vec2 uvSize = toUV(vec2(32.0), iResolution.xy);

  vec2 uvCenter = toUV(vec2(iResolution.xy * .5), iResolution.xy);

  

  vec2 bottomRight = vec2(uvPoint.x + uvSize.x, uvPoint.y + uvSize.y);

  float d = length(uv - (1.0 - uvPoint)) / uvSize.x;
  color += d;

  // if (uvCenter.x > 0.) {
  //   fragColor = vec4(0.5, 0., 0., 1.);
  //   return;
  // }

  // if ( uv.x < bottomRight.x && uv.y < bottomRight.y ) {
  //   fragColor = vec4(1., 1., 1., 1.);
  //   return;
  // }

  // if ( uvPoint.x > bottomRight.x || uvPoint.y > bottomRight.y ) {
  //   fragColor = vec4(0., 0., 1., 1.);
  //   return;
  // }

  
  uv.x += toUV(vec2(-iResolution.x * .5, 32.0), iResolution.xy).x;
  
  fragColor = vec4(uv.x, uv.y, 0., 1.);
}

`