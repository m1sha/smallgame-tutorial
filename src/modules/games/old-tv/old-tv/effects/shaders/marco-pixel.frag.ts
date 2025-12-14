export default /*glsl*/`

uniform sampler2D u_sampler2D;
uniform sampler2D u_prevSampler2D;
uniform float u_time; 
uniform vec2 iResolution;
in  vec2 v_TexCoord;
out vec4 fragColor;


void main() {
  vec2 pixelSize = vec2(2.1);
  vec2 pixel = pixelSize / iResolution;
  vec2 coord = floor(v_TexCoord / pixel) * pixel + pixel * 0.5;
  vec3 curr = texture(u_sampler2D, coord).rgb;
  vec3 prev = texture(u_prevSampler2D, coord).rgb;
  vec3 color = mix(curr, prev, abs(sin(u_time)) * 0.001);
  fragColor = vec4(color, 1.);
}

`