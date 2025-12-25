export default /*glsl*/`

uniform sampler2D uSampler;
in float v_Color;
out vec4 fragColor;

void main() {
  
  fragColor = texture(uSampler, gl_FragCoord.xy / vec2(800, 900));
  //fragColor = color * vec4(v_Color, v_Color, v_Color + 0.1, 0.8);  
}

`