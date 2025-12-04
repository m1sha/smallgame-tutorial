export default /*glsl*/`

uniform sampler2D u_sampler2D;
uniform float u_time; 
uniform vec2 iResolution;
in  vec2 v_TexCoord;
out vec4 fragColor;

float noise(vec2 p)
{
	float s = texture(u_sampler2D,vec2(1.,2.*cos(u_time))*u_time*8. + p*1.).x;
	s *= s;
	return s;
}

float onOff(float a, float b, float c)
{
	return step(c, sin(u_time + a*cos(u_time*b)));
}

float noise2(vec2 p)
{
	float s = texture(u_sampler2D,vec2(1.,2.*cos(u_time))*u_time*8. + p*1.).x;
	s *= s;
	return s;
}

float ramp(float y, float start, float end)
{
	float inside = step(start,y) - step(end,y);
	float fact = (y-start)/(end-start)*inside;
	return (1.0-fact) * inside;
	
}

float stripes(vec2 uv)
{
	float noi = noise2(uv*vec2(0.5,1.) + vec2(1.,3.));
	return ramp(mod(uv.y*4. + u_time/2.+sin(u_time + sin(u_time*0.63)),1.),0.5,0.6)*noi;
}

vec3 getVideo(vec2 uv)
{
	vec2 look = uv;
	float window = 1./(1.+20.*(look.y-mod(u_time/4.,1.))*(look.y-mod(u_time/4.,1.)));
	look.x = look.x + sin(look.y*10. + u_time)/50.*onOff(4.,4.,.3)*(1.+cos(u_time*80.))*window;
	float vShift = 0.4*onOff(2.,3.,.9)*(sin(u_time)*sin(u_time*20.) + 
										 (0.5 + 0.1*sin(u_time*200.)*cos(u_time)));
	look.y = mod(look.y + vShift, 1.);
	vec3 video = vec3(texture(u_sampler2D,look));
	return video;
}

vec2 screenDistort(vec2 uv)
{
	uv -= vec2(.5,.5);
	uv = uv*1.2*(1./1.2+2.*uv.x*uv.x*uv.y*uv.y);
	uv += vec2(.5,.5);
	return uv;
}

void main() {
  vec2 uv =   iResolution; 
  

  float pixelSize = tan(u_time) * 20.0 - 0.1;
  uv = floor(uv / pixelSize) * pixelSize;

  float noise = pow(texture(u_sampler2D,uv+sin(u_time*50.)).x,.1);
  //float noise = fract(sin(dot(v_TexCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
  noise = noise * 0.18; // настройка интенсивности шума

 

  // Эффект сканирующих линий
  float scanLine = mod(v_TexCoord.y * uv.y + u_time * 4.0, 4.0) - 1.0;

  scanLine = smoothstep(0.0, 0.1, scanLine); // Мягкие линии

  // Искажения пикселей
  vec2 distort = v_TexCoord; //+ vec2(sin(v_TexCoord.y * 0.1) * sin(u_time) * 0.1, cos(v_TexCoord.x * 0.1) * 4.0);
   // + vec2(sin(v_TexCoord.y * 0.1) * sin(u_time) * 0.1, cos(v_TexCoord.x * 0.1) * 4.0);
  
  // if (mod(u_time * 2.0, 8.0) == 2.0){
  //   distort.x = ((distort.x + tan(u_time) + 0.5) * sin(u_time / 0.1)) + 0.5;
  // } 

   float xxx = mod(u_time * 0.05, 2.0);
   if (xxx > 1.0 && xxx < 1.1){
     // distort =vec2(v_TexCoord.x, v_TexCoord.y + sin(u_time * 0.8 + 0.5)) * 1.1;
   }

   if (xxx > 0.1 && xxx < 0.2){
    // distort =vec2(v_TexCoord.x, v_TexCoord.y + cos(u_time * 0.8 + 0.5)) * 1.1;
   }
  
  //texColor.r = texture(u_sampler2D, distort).r;
  //texColor.g = texture(u_sampler2D, distort).b;
  //texColor.b = texture(u_sampler2D, distort).b;
  
  vec4 texColor = texture(u_sampler2D, distort);

  // Разделение каналов и добавление шума
  texColor.r += noise * 0.05;
  texColor.g += noise * 0.1;
  texColor.b += noise * 0.05;

  vec2 uv2 = screenDistort(v_TexCoord.xy / vec2(1024.0, 768.0)); // screenDistort(vec2(1024.0, 768.0));
  //float vigAmt = 3.+.3*sin(u_time + 5.*cos(u_time*5.));
	//float vignette = (1.-vigAmt*(uv2.y-.5)*(uv2.y-.5))*(1.-vigAmt*(uv2.x-.5)*(uv2.x-.5));
  vec3 video = getVideo(uv2);
  //video += stripes(uv2);
  video += noise2(uv2*2.)/2.;
  //video *= vignette;
  video *= (12.+mod(uv2.y*30.+u_time,1.))/13.;
	



  texColor.r += video.r;
  texColor.g += video.g;
  texColor.b += video.b;


  
  float xxx1 = mod(u_time * 0.05, 2.0);
  if (xxx1 > 0.5 && xxx < 0.7){
    texColor.r += 0.12;
    texColor.g += 0.17;
    texColor.b += 0.05;
  }

  

  // Применяем сканирующие линии и шум

  vec4 r =    texColor *(0.8 + scanLine * 0.2) ;//+ c;  

  fragColor = r;
}

`