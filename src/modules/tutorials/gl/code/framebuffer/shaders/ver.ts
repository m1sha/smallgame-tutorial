export default /*glsl*/`

in vec2 pos;
in vec3 aColor;
out vec3 vColor;

void main()
{
  vColor = aColor;
  gl_Position = vec4(pos, 0.0, 1.0);
  gl_PointSize = 20.0;
}

`