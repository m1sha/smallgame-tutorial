export default /*glsl*/`

uniform vec2 uResolution;
uniform mat3 uProj;
uniform vec2 uTileSize;

in vec2 aPos;
in vec2 aTexCoord;
in vec2 aShift;

out vec2 vTexCoord;


vec2 uv() {
  int id = gl_VertexID % 4;
  float l = aTexCoord.x;
  float b = aTexCoord.y;
  float r = l + uTileSize.x;  
  float t = b - uTileSize.y + 1.; 
  
  if (id == 0) return vec2(l, b);
  if (id == 1) return vec2(l, t);
  if (id == 2) return vec2(r, b);

  return vec2(r, t);
}


void main()
{
  vec3 pos = uProj * vec3(aPos + aShift, 1.);
  gl_Position = vec4(pos, 1.); 
  vTexCoord = uv();
}

`