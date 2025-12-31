export default /*glsl*/`
uniform sampler2D uSampler;
in float vColor;
out vec4 fragColor;

void main() {
  vec4 color = vec4(vec3(vColor), 1.0);
  vec2 size = vec2(textureSize(uSampler, 0));
  vec4 tex = texture(uSampler, gl_FragCoord.xy / size / 2.);
  fragColor = tex; 
}
`