export default /*glsl*/`
uniform vec2 uOffset;
in vec2 aPosition;
in vec2 aTexCoord;
in float aLayer;
in float aCoof;
out vec2 vTexCoord;
flat out mediump int vLayer;

void main()
{
  int num = gl_VertexID / 4;
  vLayer = int(aLayer);
  vTexCoord = (uOffset * aCoof) + aTexCoord;

  
  gl_Position = vec4(aPosition, 0., 1.0);
}

`