export default /*glsl*/`
uniform sampler2D u_sampler2D;
uniform float u_time; 
uniform vec2 iResolution;
in  vec2 v_TexCoord;
out vec4 fragColor;

void main() //(out vec4 c, vec2 p)
{
  vec2 fragCoord = gl_FragCoord.xy;
  vec2 fragCoordOrig = fragCoord;
    // Enlarge pixels to make it visible on high resolution displays.
    //fragCoord = fragCoord  ;
    // 2X downsampling.
    vec2 uv = (fragCoord)/iResolution.xy;
    
    // Simple bilinear / box 2X downsampling.
    vec3 colOrig = 2.0* texture(u_sampler2D, uv).xyz;
    
    // Debug "red" color indicator.
    colOrig = fragCoordOrig.x < 50.0 && fragCoordOrig.y < 50.0 ? vec3(1.0, 0.0, 0.0) : colOrig;

    // Proposed optimized lowpass 2X downsampling filter.
    vec3 col = vec3(0.0);
    col += 0.37487566 * texture(u_sampler2D, uv + vec2(-0.75777156,-0.75777156)/iResolution.xy).xyz;
    col += 0.37487566 * texture(u_sampler2D, uv + vec2(0.75777156,-0.75777156)/iResolution.xy).xyz;
    col += 0.37487566 * texture(u_sampler2D, uv + vec2(0.75777156,0.75777156)/iResolution.xy).xyz;
    col += 0.37487566 * texture(u_sampler2D, uv + vec2(-0.75777156,0.75777156)/iResolution.xy).xyz;
    
    col += -0.12487566 * texture(u_sampler2D, uv + vec2(-2.90709914,0.0)/iResolution.xy).xyz;
    col += -0.12487566 * texture(u_sampler2D, uv + vec2(2.90709914,0.0)/iResolution.xy).xyz;
    col += -0.12487566 * texture(u_sampler2D, uv + vec2(0.0,-2.90709914)/iResolution.xy).xyz;
    col += -0.12487566 * texture(u_sampler2D, uv + vec2(0.0,2.90709914)/iResolution.xy).xyz;    
    
    // Debug "green" color indicator.
    col = fragCoordOrig.x < 50.0 && fragCoordOrig.y < 50.0 ? vec3(0.0, 1.0, 0.0) : col;
    
    // Animate between two filtering modes with more time spent on extremes.
    float anim = sin(1.0);
    //anim = pow(abs(anim), 0.33)*sign(anim);
    fragColor = vec4(mix(col, colOrig, anim * 0.5 + 0.5),1.0);
}

`
