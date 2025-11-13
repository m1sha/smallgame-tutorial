export default /*glsl*/`
uniform float time;
uniform vec2 iResolution;
uniform vec4 iMouse;
uniform vec2 iMouseShift;
uniform vec2 iEndPos;
uniform sampler2D u_sampler2D;
in  vec2 v_TexCoord;
out vec4 fragColor;


void main() {

  vec4 color = texture(u_sampler2D, v_TexCoord);
  vec4 color2 = texture(u_sampler2D, v_TexCoord);

  vec2 uv = gl_FragCoord.xy / iResolution -.5;
  //uv.y += 0.01;
  uv = fract(uv * vec2(16.0, 8.0));
  
 
  float d = length(uv);
  float c = step(1., d);


  vec2 div = fwidth(uv);
  vec2 ss = step(div * 2.0, uv);
  float f =  min(ss.x, ss.y);

  float r = smoothstep(0.4,0.1, color.r);
  color.r *= r;
  color.b -= 0.2;
  color.g -= 0.1;
  


  

  fragColor = min(color2, color) * vec4(vec3(1.), f) ;

 // 

 // fragColor = vec4(vec3(c), 1.0);
}
`