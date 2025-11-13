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
  vec2 uv = v_TexCoord.xy;
  vec2 gridUV = uv * 10.0; 

     
  vec2 f = fract(gridUV);
  vec2 df = fwidth(gridUV); 
  vec2 g = step(df, f); // smoothstep(df , df , f);
  float line = min(g.x, g.y); 
  line = 1.0 - line;


  vec2 f0 = fract(f * 2.0);
  vec2 df0 = fwidth(f * 2.0); 
  vec2 g0 = step(df0, f0);
  float line0 = min(g0.x, g0.y); 
  line0 = 1.0 - line0;



    

 //  fragColor =;

 //vec3 color = texture(u_sampler2D, v_TexCoord);

 fragColor = texture(u_sampler2D, v_TexCoord) +  vec4(vec3(max(line, line0)), line > 0.0001 ? -1.0 : 1.0);
}
`