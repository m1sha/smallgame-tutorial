export default /*glsl*/`

uniform sampler2D uSampler;
in vec2 vTexCoord;
out vec4 fragColor;

void main () {
  fragColor = texture(uSampler, vTexCoord); // + vec4(0.1, 0.2, 0.0, 0.5);
}
`