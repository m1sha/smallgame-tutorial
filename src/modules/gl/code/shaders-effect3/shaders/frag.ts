export default /*glsl*/`

uniform float iTime;
uniform vec2 iResolution;
uniform vec4 iMouse;
out vec4 fragColor;

vec3 palette(float t) {
  vec3 a = vec3(0.5, 0.5, 0.5); 
  vec3 b = vec3(0.5, 0.5, 0.5); 
  vec3 c = vec3(1.0, 1.0, 1.0); 
  vec3 d = vec3(0.163, 0.416, 0.557);
  				
  
  return a + b *cos( 6.28318*(c*t+d));
} 

mat2 rot2D(float angle) {
  float s = sin(angle);
  float c = cos(angle);
  return mat2(c, -s, s, c);
}

float opSmoothUnion( float d1, float d2, float k )
{
    float h = clamp( 0.5 + 0.5*(d2-d1)/k, 0.0, 1.0 );
    return mix( d2, d1, h ) - k*h*(1.0-h);
}

float smin(float a, float b, float k) {
  float h = max(k - abs(a - b), 0.0) / k;
  return min(a, b) - h*h*h*k*(1.0 / 6.0);
}

float sdOctahedron( vec3 p, float s)
{
  p = abs(p);
  return (p.x+p.y+p.z-s)*0.57735027;
}

float sdSphere (vec3 p, float s) {
  return length(p) - s;
}

float sdBox (vec3 p, vec3 b) {
  vec3 q = abs(p) - b;
  return length(max(q,0.0)) + min(max(q.x,max(q.y,q.z)),0.0);
}

float map(vec3 p) {
  vec3 spherePos = vec3(sin(iTime) * 3.0, 0.0, 0.0);
  float sphere = sdSphere(p - spherePos, 1.0);

  vec3 q = p;
  q.y -= iTime * 0.4;
  q = fract(q) - 0.5;
  //q.xy = (fract(q.xy) - 0.5);
  //q.z = mod(q.z, 0.25) * 0.125;
  
  // q.xy *= rot2D(iTime);
  float box = sdBox(q, vec3(0.15));
  return box;

  // float ground = p.y + 0.75;
  // return smin(ground, smin(sphere, box, 2.0), 1.0);
}

void main() {
  vec2 uv = (gl_FragCoord.xy * 2.0 - iResolution.xy) / iResolution.y;
  vec2 mo = (iMouse.xy * 2.0 - iResolution.xy) / iResolution.y * 2.0;
  vec3 ro = vec3(0.0, 0.0, -3.0);
  vec3 rd = normalize(vec3(uv , 1.0));
  vec3 col = vec3(0.0);
  float t = 0.0;
  

  ro.yz *= rot2D(-mo.y);
  rd.yz *= rot2D(-mo.y);

  ro.xz *= rot2D(-mo.x);
  rd.xz *= rot2D(-mo.x);
  

  // ray
  int i;
  for (i = 0; i < 80; i++) {
    vec3 p = ro + rd * t;
    float d = map(p);
    t += d;
    //col = vec3(i) / 80.0;

    if (d < 0.001 || t > 100.0) break;
  }

  col = palette(t * 0.05 + float(i) * 0.005);


  fragColor = vec4(col, 1.0);
}

`