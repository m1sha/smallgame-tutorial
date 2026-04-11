export default /*glsl*/`

uniform vec2 uResolution;
uniform vec2 uRectCenter;

in vec2 aPos;
in vec2 aTexCoord;
in vec2 aShift;
in float aAngle;
out vec2 vTexCoord;

mat4 orto() {
  float w = uResolution.x;
  float h = uResolution.y;

  return mat4 (
    2.0 / w,      .0,          .0,   .0,
     .0,         2.0 / h ,     .0,   .0, 
     .0,          .0,         1.0,   .0,
   -1.,         -1.,         -1.,   1.
  );
}

mat2 rot() {
  float c = cos(aAngle);
  float s = sin(aAngle);

  return mat2(
    c, s, 
    -s, c
  );
}

void main()
{
  vec2 pos = rot() * (aPos - uRectCenter) + uRectCenter + aShift;
  pos.y = uResolution.y - pos.y;
  gl_Position = orto()  * vec4(pos, 0., 1.);
  vTexCoord = aTexCoord;
}

`