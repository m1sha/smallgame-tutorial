export default /*glsl*/`
in vec3 vPos;

in vec4 vColors;
out vec4 oColors;

void main()
{
  gl_Position = vec4(vPos, 1.0);
  oColors = vColors;
}

`