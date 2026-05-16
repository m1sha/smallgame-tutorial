export default /*glsl*/`

uniform mediump sampler2DArray uSampler;
in vec2 vTexCoord;
flat in int vLayer;
out vec4 fragColor;

void main() {
  
  fragColor = texture(uSampler, vec3(vTexCoord, vLayer));  
}

`