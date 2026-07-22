export default /*glsl*/`

uniform sampler2D uSampler;
in vec2 vTexCoord;
out vec4 fragColor;

void main() {
  fragColor = texture(uSampler, vTexCoord);  
}

`