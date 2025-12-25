export default /*glsl*/`

in  vec2 a_Position;
in  float a_Color;
out float v_Color;

void main()
{
  gl_Position = vec4(a_Position, 0.0, 1.0);
  v_Color = a_Color;
}

`