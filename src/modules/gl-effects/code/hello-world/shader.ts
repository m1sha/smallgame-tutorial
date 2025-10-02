export default /*glsl*/`

uniform float time;
out vec4 fragColor;

vec2 iResolution = vec2(1400.0, 800.0);

vec3 palette(float t) {
 
  				
   vec3 a = vec3(0.5, 0.5, 0.5);
   vec3 b = vec3(0.5, 0.5, 0.5);
   vec3 c = vec3(1.0, 1.0, 0.0);
   vec3 d = vec3(0.50, 0.20, 0.25);
  return a + b *cos( 6.28318*(c*t+d));
} 

void main() {
  float cc = 1.0;
  vec3 finalColor = vec3(0.0);
  vec2 uv = (gl_FragCoord.xy * 2.0 - iResolution.xy) / iResolution.y;
  
  
  
    float d = length(fract(uv * 8.0) - 0.5) ;
    
    d = abs(sin(d + time* 0.5)- 0.5);
    
    d = step (d, 0.01);
    
    
    
    finalColor += d;
  

  fragColor = vec4(finalColor, 1.0);
}

`