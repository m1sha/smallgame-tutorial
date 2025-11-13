export default /*glsl*/`
uniform vec2 iResolution;
out vec4 fragColor;
void main () {
  vec2 uv = gl_FragCoord.xy / iResolution - 0.5;

  vec2 uv2 = uv * vec2(128.0, 84.0);
  
  vec2 f = fract(uv2);
  vec2 df = fwidth(uv2);
  vec2 s = step( df, f);


  float alpha = 1. - min(s.x, s.y);
  fragColor = vec4(.5, .5, .5, alpha);
}
`