export default /*glsl*/`

uniform float uPointSize;
in vec2 aPosition;
in float aColor;
out float vColor;

void main()
{
  gl_Position = vec4(aPosition, 0.0, 1.0);

  vColor = aColor;
}

`