export default /*glsl*/`
///uniform mat4 u_mat;
in vec4 aPosition;
out vec4 vPosition;


void main()
{
  //vPosition = aPosition * u_mat;
  gl_Position =  aPosition;
}

`