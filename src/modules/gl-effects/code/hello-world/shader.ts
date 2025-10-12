export default /*glsl*/`

uniform float time;
out vec4 fragColor;
uniform vec2 iResolution;


vec3 palette(float t) {
  vec3 a = vec3(0.0, 0.1, 0.0);
  vec3 b = vec3(0.5, 0.4, 0.5);
  vec3 c = vec3(1.0, 1.0, 1.0);
  vec3 d = vec3(0.70, 0.20, 0.95);
  return a + b *cos( 1.28318*(c*t+d));
} 

float sdBox( in vec2 p, in vec2 b )
{
    vec2 d = abs(p)-b;
    return length(max(d,0.0)) + min(max(d.x,d.y),0.0);
}

float sdHexagon( in vec2 p, in float r )
{
    const vec3 k = vec3(-0.866025404,0.5,0.577350269);
    p = abs(p);
    p -= 2.0*min(dot(k.xy,p),0.0)*k.xy;
    p -= vec2(clamp(p.x, -k.z*r, k.z*r), r);
    return length(p)*sign(p.y);
}

float sdHexagram( in vec2 p, in float r )
{
    const vec4 k = vec4(-0.5,0.8660254038,0.5773502692,1.7320508076);
    p = abs(p);
    p -= 2.0*min(dot(k.xy,p),0.0)*k.xy;
    p -= 2.0*min(dot(k.yx,p),0.0)*k.yx;
    p -= vec2(clamp(p.x,r*k.z,r*k.w),r);
    return length(p)*sign(p.y);
}



void main() {
  
  vec3 color = vec3(0.0);
  //vec2 st = gl_FragCoord.xy/iResolution.xy;
  vec2 uv = (gl_FragCoord.xy - .5 * iResolution.xy) / iResolution.y;

  
  //uv = fract(uv * cos(time* 0.5) / sin(time* 0.5) + uv * 2.0) - 0.5;
  uv.x += cos(time * 2.25) * .125 - sin(time * 1.25) * .125;
  uv.y += sin(time * 0.85) * .125 + cos(time * 1.25) * .125;
  
  
  float v = 0.0;
   
  v += sdHexagram(uv, 0.3); //sdBox(uv, vec2(0.05));
  v = sdHexagon(uv, abs(sin(time) * 0.25) + 0.05); //;
  color =  smoothstep(vec3((sin(v * time * 0.4))) , vec3(0.1), vec3(0.15));
  color = palette(color.x);
  
  

  fragColor = vec4(color, 1.0);
}

`