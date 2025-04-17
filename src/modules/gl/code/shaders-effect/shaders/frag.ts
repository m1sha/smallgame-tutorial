export default /*glsl*/`

uniform float time;
out vec4 fragColor;

vec2 iResolution = vec2(800.0, 800.0);

vec3 palette(float t) {
  vec3 a = vec3(0.5, 0.5, 0.5); 
  vec3 b = vec3(0.5, 0.5, 0.5); 
  vec3 c = vec3(1.0, 1.0, 1.0); 
  vec3 d = vec3(0.263, 0.416, 0.557);
  				
  // vec3 a = vec3(0.5, 0.5, 0.5);
  // vec3 b = vec3(0.5, 0.5, 0.5);
  // vec3 c = vec3(1.0, 1.0, 0.0);
  // vec3 d = vec3(0.50, 0.20, 0.25);
  return a + b *cos( 6.28318*(c*t+d));
} 

float sdHexagon( in vec2 p, in float r )
{
    const vec3 k = vec3(-0.866025404,0.5,0.577350269);
    p = abs(p);
    p -= 2.0*min(dot(k.xy,p),0.0)*k.xy;
    p -= vec2(clamp(p.x, -k.z*r, k.z*r), r);
    return length(p)*sign(p.y);
}

void main() {
  float cc = 16.0;
  vec3 finalColor = vec3(0.0);
  vec2 uv = (gl_FragCoord.xy * 2.0 - iResolution.xy) / iResolution.y;
  vec2 uv0 = uv;
  
  for (float i = 0.0; i < 4.0; i++) {
    uv = fract(uv * 2.5) - 0.5;
    float d = length(uv) * exp(-length(uv0));
    vec3 color = palette(length(uv0) + i *0.4 + time * 0.1);
    d = sin(d * cc + time) / cc;
    d = abs(d);
    d = smoothstep(0.0, 0.1, d);
    d = pow(0.01 / d, 0.8);
    //d = sdHexagon(uv0.xy, d + tan(time)) * 2.;
    //d = pow(0.01 / d, 0.8);
    finalColor += color * d;
  }

  fragColor = vec4(finalColor, 1.0);
}

`