
export default /*glsl*/`
uniform sampler2D u_sampler2D;
uniform float u_time; 
uniform vec2 iResolution;
in  vec2 v_TexCoord;
out vec4 fragColor;

#define LUM vec3(.2126, .7152, .0722)

#define CHROMA_KEY
#define CHROMA_BIAS (0.13)
#define SCALE       (1.00)
#define BGCOLOR     vec3(0.03, 0.1, 0.2)

void main() //(out vec4 c, vec2 p)
{
  //vec2 uv = (gl_FragCoord.xy - .5 * iResolution.xy) / iResolution.y;

  float s = iResolution.x / 60e1;
  vec4 c = texture(u_sampler2D, floor((gl_FragCoord.xy ) / s) * s / iResolution.xy );

  
  

  #ifdef CHROMA_KEY
      float lum = dot(LUM, c.rgb); // luminance
      if (lum > max(c.r, c.b) + CHROMA_BIAS) c = vec4(BGCOLOR,1);
  #endif /* CHROMA_KEY */

  fragColor = c;
}

`