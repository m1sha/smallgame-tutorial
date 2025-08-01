export default /*glsl*/`
uniform sampler2D u_sampler2D;
uniform float u_time; 
uniform vec2 iResolution;
in  vec2 v_TexCoord;
out vec4 fragColor;
#define RGB( r, g, b ) vec3( float( r ) / 255.0, float( g ) / 255.0, float( b ) / 255.0 )

vec2 CRTCurveUV( vec2 uv )
{
    uv = uv * 2.0 - 1.0;
    vec2 offset = abs( uv.yx ) / vec2( 6.0, 4.0 );
    uv = uv + uv * offset * offset;
    uv = uv * 0.5 + 0.5;
    return uv;
}

void DrawVignette( inout vec3 color, vec2 uv )
{    
    float vignette = uv.x * uv.y * ( 1.0 - uv.x ) * ( 1.0 - uv.y );
    vignette = clamp( pow( 16.0 * vignette, 0.3 ), 0.0, 1.0 );
    color *= vignette;
}

void DrawScanline( inout vec3 color, vec2 uv )
{
    float scanline 	= clamp( 0.95 + 0.05 * cos( 3.14 * ( uv.y + 0.008 * u_time ) * 240.0 * 1.0 ), 0.0, 1.0 );
    float grille 	= 0.85 + 0.15 * clamp( 1.5 * cos( 3.14 * uv.x * 640.0 * 1.0 ), 0.0, 1.0 );    
    color *= scanline * grille * 1.2;
}

void main() //(out vec4 c, vec2 p)
{
  vec3 colOrig = texture(u_sampler2D, v_TexCoord).xyz;

  vec3 color = colOrig;
  

  // CRT effects (curvature, vignette, scanlines and CRT grille)
  vec2 uv    = gl_FragCoord.xy / iResolution.xy;
  vec2 crtUV = CRTCurveUV( uv );
  if ( crtUV.x < 0.0 || crtUV.x > 1.0 || crtUV.y < 0.0 || crtUV.y > 1.0 )
  {
      color = vec3( 0.0, 0.0, 0.0 );
  }
  DrawVignette( color, crtUV );
  DrawScanline( color, uv );
  
  fragColor.xyz 	= color + vec3(0.15);
  fragColor.w		= 1.0;
}

`