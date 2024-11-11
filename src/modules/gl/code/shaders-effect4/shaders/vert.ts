export default /*glsl*/`
///uniform mat4 u_mat;
in vec4 aPosition;

void main()
{
  gl_Position =  aPosition;
}

`