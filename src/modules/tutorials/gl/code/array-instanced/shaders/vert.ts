export default /*glsl*/`

in vec2 aPos;
in vec3 aColor;
in vec3 aTransform;

out vec3 vColor;

void main()
{

  mat3 mat = mat3(1.0);
  mat[2][0] = aTransform[0];
  mat[2][1] = aTransform[1];

  mat[0][0] = cos(aTransform[2]);
  mat[1][0] = -sin(aTransform[2]);

  mat[0][1] = sin(aTransform[2]);
  mat[1][1] = cos(aTransform[2]);

  mat[0][2] = 0.0;
  mat[1][2] = 0.0;

  vec3 pos = mat * vec3(aPos, 1.0);


  gl_Position = vec4(pos, 1.0);
  vColor = aColor;
}

`