export default /*glsl*/`
///uniform mat4 u_mat;
in vec4 aPosition;
in  vec2 a_TexCoord;
out vec2 v_TexCoord;


void main()
{
  v_TexCoord = a_TexCoord;
  gl_Position =  aPosition;
}

`