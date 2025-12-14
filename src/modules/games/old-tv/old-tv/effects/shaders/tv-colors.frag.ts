export default /*glsl*/`

uniform sampler2D u_sampler2D;
uniform float u_time; 
uniform vec2 iResolution;
in  vec2 v_TexCoord;
out vec4 fragColor;


void main() {
  //vec2 pixelSize = vec2(2.1);
  //vec2 pixel = pixelSize / iResolution;
  //vec2 coord = floor(v_TexCoord / pixel) * pixel + pixel * 0.5;
  //fragColor = texture(u_sampler2D, coord);  


   vec2 uv = v_TexCoord;
    
    // Хроматическая аберрация (смещение RGB)
    vec2 offset = vec2(0.003 * sin(u_time), 0.002 * cos(u_time));
    vec3 color;
    color.r = texture(u_sampler2D, uv + offset).r;
    color.g = texture(u_sampler2D, uv).g;
    color.b = texture(u_sampler2D, uv - offset).b;
    
    // Ограниченная палитра CRT (квантизация + гамма)
    color = pow(color, vec3(0.8));  // Гамма для контраста
    color = floor(color * 16.0) / 16.0;  // 16 градаций как в старых ТВ
    color = pow(color, vec3(1.2));  // Обратная гамма
    
    // Фосфорное свечение (простой bloom)
    vec3 bloom = texture(u_sampler2D, uv).rgb;
    bloom = bloom * bloom * 2.0;  // Квадратичный bloom
    color += bloom * 0.3;
    
    // Мерцание сигнала
    float flicker = 0.98 + 0.02 * sin(u_time * 2.0);
    color *= flicker;
    
    fragColor = vec4(color, 1.0);
}

`