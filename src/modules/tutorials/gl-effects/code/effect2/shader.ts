export default /*glsl*/`

uniform sampler2D u_sampler2D;
in  vec2 v_TexCoord;
uniform float time;
out vec4 fragColor;

vec2 iResolution = vec2(1200.0, 800.0);

vec3 palette(float t) {
  // vec3 a = vec3(0.5, 0.5, 0.5); 
  // vec3 b = vec3(0.5, 0.5, 0.5); 
  // vec3 c = vec3(1.0, 1.0, 1.0); 
  // vec3 d = vec3(0.263, 0.416, 0.557);
  				
  vec3 a = vec3(1.5, 0.5, 0.5);
  vec3 b = vec3(0.5, 0.5, 0.5);
  vec3 c = vec3(1.0, 1.0, 0.0);
  vec3 d = vec3(0.50, 4.20, 0.25);
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
  
  float cc = 8.0;
  
  vec2 uv = (gl_FragCoord.xy * 2.0 - iResolution.xy) / iResolution.y;
  vec2 uv0 = uv;
  vec4 texel = texture(u_sampler2D, v_TexCoord);  
  vec3 finalColor = texel.rgb; // vec3(0.0);
  
  for (float i = 0.0; i < 4.0; i++) {
    uv = fract(uv * 1.5) - 0.5;
    float d = length(uv) * exp(-length(uv0));
    vec3 color = texel.rgb * palette(length(uv0) + i *0.4 + time * 0.1);
    d = sin(d * cc + time) / cc;
    d = abs(d);
    d = smoothstep(0.0, 0.1, d);
    d = pow(0.01 / d, 0.8);
    //d = sdHexagon(uv0.xy, d + tan(time)) * 1.2;
    //d = pow(0.01 / d, 0.8);
    finalColor += color * d;
  }

  if (texel.r < 0.1 ) {
    discard;
    
  } else {
    fragColor = vec4(finalColor, 1.0);
  }

  
}

`