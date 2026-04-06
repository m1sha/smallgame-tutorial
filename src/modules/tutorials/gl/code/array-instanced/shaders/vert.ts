export default /*glsl*/`

in vec2 aPos;
in vec3 aColor;
in vec2 aShift;

out vec3 vColor;

void main()
{
  vec2 pos = aPos + aShift;
  gl_Position = vec4(pos, 0.0, 1.0);
  vColor = aColor;
  //gl_PointSize = aSize;
}

`