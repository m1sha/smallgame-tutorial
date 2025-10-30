export default /*glsl*/`

in vec2 pos;
in vec2 aTexCoord;
out vec2 vTexCoord;

void main()
{
  vTexCoord = aTexCoord;
  gl_Position = vec4(pos, 0.0, 1.0);
}

`