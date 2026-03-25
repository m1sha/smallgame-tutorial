export default /*glsl*/`

in vec2 aPos;
in vec3 aColor;
in vec3 aMat0;
in vec3 aMat1;
in vec3 aMat2;
out vec3 vColor;

void main()
{
  mat3 aMat = mat3(aMat0, aMat1, aMat2);
  vec3 pos = vec3(aPos, 1.0);
  gl_Position = vec4(pos, 1.0);
  vColor = aMat0;
  //gl_PointSize = aSize;
}

`