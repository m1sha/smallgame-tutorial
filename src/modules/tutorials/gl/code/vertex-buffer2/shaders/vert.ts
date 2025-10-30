export default /*glsl*/`

uniform mat4 u_mat;
in vec4 aPosition;
in vec3 aColor;
out vec3 vColor;


void main()
{
  vColor = aColor;
  gl_Position = u_mat * aPosition;
  gl_PointSize = 100.0;
}

`