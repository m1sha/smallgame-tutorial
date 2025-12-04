export default /*glsl*/`
uniform sampler2D u_sampler2D;
uniform float u_time; 
uniform vec2 iResolution;
in  vec2 v_TexCoord;
out vec4 fragColor;


//#define CURVE 
#define SCANS
//#define FLICKS
//#define GRAINS 
//#define YBUG 
#define DIRTY
//#define STRIP
//#define COLOR
//#define BLINK
//#define VIG

float FREQUENCY = 11.0;

float rand2d(vec2 co) {
  return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

float rand(float n) {
  return fract(sin(n) * 43758.5453123);
}

float noise(float p) {
float fl = floor(p);
  float fc = fract(p);
return mix(rand(fl), rand(fl + 1.0), fc);
}

float map(float val, float amin, float amax, float bmin, float bmax) {
  float n = (val - amin) / (amax-amin);
  float m = bmin + n * (bmax-bmin);
  return m;
}

float snoise(float p){
  return map(noise(p),0.0,1.0,-1.0,1.0);
}

float threshold(float val,float cut){
  float v = clamp(abs(val)-cut,0.0,1.0);
  v = sign(val) * v;
  float scale = 1.0 / (1.0 - cut);
  return v * scale;
}

vec2 uv_curve(vec2 uv) {
	uv = (uv - 0.5) * 2.0;
	uv *= 1.2;	
	uv.x *= 1.0 + pow((abs(uv.y) / 5.0), 2.0);
	uv.y *= 1.0 + pow((abs(uv.x) / 4.0), 2.0);
    uv /= 1.15;
	uv  = (uv / 2.0) + 0.5;
	return uv;
}

vec3 color(sampler2D tex, vec2 uv){        
    vec3 color = texture(u_sampler2D,uv).rgb;
    #ifdef COLOR
    float bw = (color.r + color.g + color.b) / 3.0;
    color = mix(color,vec3(bw,bw,bw),.95);
    float p = 1.5;
    color.r = pow(color.r,p);
    color.g = pow(color.g,p-0.1);
    color.b = pow(color.b,p);
    #endif
    return color;
}

vec3 ghost(sampler2D tex, vec2 uv){
    #ifdef FLICKS
    
    float n1 = threshold(snoise(u_time*10.),.85);
    float n2 = threshold(snoise(2000.0+u_time*10.),.85);
    float n3 = threshold(snoise(3000.0+u_time*10.),.85);
    
    vec2 or = vec2(0.,0.);
    vec2 og = vec2(0,0.);
    vec2 ob = vec2(0.,0);

    float os = .05;
    or += vec2(n1*os,0.);
    og += vec2(n2*os,0.);
    ob += vec2(0.,n3*os);
  
    float r = color(u_sampler2D,uv + or).r;
    float g = color(u_sampler2D,uv + og).g;
    float b = color(u_sampler2D,uv + ob).b;
    vec3 color = vec3(r,g,b);
    return color;
    #else 
    return texture(u_sampler2D,uv).rgb;
    #endif
}

vec2 uv_ybug(vec2 uv){
    float n4 = clamp(noise(200.0+u_time*2.)*14.,0.,2.);
    uv.y += n4;
    uv.y = mod(uv.y,1.);
    return uv;
}

vec2 uv_hstrip(vec2 uv){
    float vnoise = snoise(u_time*6.);
    float hnoise = threshold(snoise(u_time*10.),.5);

    float line = (sin(uv.y*10.+vnoise)+1.)/2.;
    line = (clamp(line,.9,1.)-.9)*10.;
    
    uv.x += line * 0.03 * hnoise;
    uv.x = mod(uv.x,1.);
    return uv;
}



void main()
{
    float t = float(int(u_time * FREQUENCY));
    
    vec2 uv = gl_FragCoord.xy / iResolution.xy;
    
    //if(iMouse.z>0.){
    //    fragColor = texture(u_sampler2D,uv); 
    //    return;
    //}

    #ifdef CURVE
    uv = uv_curve(uv);
    #endif

    vec2 ouv = uv;
    
    #ifdef GRAINS
    float xn = threshold(snoise(u_time*10.),.7) * 0.05;
    float yn = threshold(snoise((500.0+u_time)*10.),.7) * 0.05;
    
    float r = rand2d(uv+(t+100.0)*.01);
    uv = uv + vec2(xn,yn) * r;
    #endif
    
     
    #ifdef YBUG
    uv = uv_ybug(uv);
    #endif

    #ifdef STRIP
    uv = uv_hstrip(uv);
    #endif
    
   
    vec2 onePixel = vec2(0.0, 1.0) / iResolution.xy * 3.;
    #ifdef BLUR
    vec3 colorA = ghost(u_sampler2D,uv + onePixel,or,og,ob);
    vec3 colorB = ghost(u_sampler2D,uv - onePixel,or,og,ob);
    vec3 colorC = ghost(u_sampler2D,uv,or,og,ob);
    vec3 color = (colorA+colorB+colorC)/3.0;
    #else
    vec3 color = ghost(u_sampler2D,uv);
    #endif

    //color = colorC;
    
    float scanA = (sin(uv.y*3.1415*iResolution.y/2.7)+1.)/2.;
    float scanB = (sin(uv.y*3.1415*1.)+1.)/2.;
    #ifdef SCANS
    color *= .75 + scanA * .25;
    //color *= .5 + scanC * .5;
    //color *= scanB;    
    #endif
    
    #ifdef BLINK
    float blink = .96 + .04*(sin(u_time*100.)+1.)/2.;
    color *= blink;
    #endif
    
    #ifdef VIG
    float vig = 44.0 * (ouv.x * (1.0-ouv.x) * ouv.y * (1.0-ouv.y));
	vig *= mix( 0.7, 1.0, rand(t + 0.5));
    color *= .6 + .4*vig;
    #endif
     
    #ifdef DIRTY
    color *= 1.0 + rand2d(uv+t*.01) * 0.2;	
    #endif

    vec3 backColor = vec3(.4,.4,.4);
    if (ouv.x < 0.0 || ouv.x > 1.0)
		color = backColor;
	if (ouv.y < 0.0 || ouv.y > 1.0)
		color = backColor;

    fragColor = vec4(color,1.0);
}


//void main()
//{
//  //float s = iResolution.x / 60e1;
//  //vec4 c = texture(u_sampler2D, floor((gl_FragCoord.xy ) / s) * s / iResolution.xy );
//  //fragColor = texture(u_sampler2D, v_TexCoord) + vec4(0.1, 0.0, 0.0, 1.0);
//}

`