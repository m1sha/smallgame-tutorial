export default /*glsl*/`
const int BLUR_STEPS = 3;          // Кол-во шагов blur (три–пиксельный, можно увеличить)
const float LOW_RES_FACTOR = 0.25; // Делим resolution до 25% (4×4 пиксели на 16×16)
const float FADE_ALPHA   = 0.90;   // 1 – мгновенно обновляется, 0 – только прошлый кадр
const float GLOW_THRESHOLD = 0.9;  // Порог яркости для глянца
const float GLOW_STRENGTH = 0.3;   // Сила глянца

// ---------- Входы ----------
//in vec2 v_texCoord;            // UV координаты
//uniform sampler2D u_scene;     // Текстура с текущим кадром (низкое разрешение)
//uniform sampler2D u_prev;      // Текстура с предыдущим кадром
//uniform float u_time;          // Время (для простого тайм‑зависимого шума)
//uniform vec2 u_resolution;     // Экранное разрешение

uniform sampler2D u_sampler2D;
uniform sampler2D u_prevSampler2D;
uniform float u_time; 
uniform vec2 iResolution;
in  vec2 v_TexCoord;
out vec4 fragColor;


void main() {
    // 1. Считаем базовый цвет из текущего кадра (с учётом pixelation)
    vec3 cur = texture(u_sampler2D, v_TexCoord).rgb;

    // 2. Погасаем предыдущий кадр (fade)
    vec3 prev = texture(u_prevSampler2D, v_TexCoord).rgb;
    vec3 base = mix(cur, prev, FADE_ALPHA); // α * prev + (1-α) * cur

    // 3. Размываем при движении (linear blur 3‑pixel)
    vec2 texelSize = 1.0 / iResolution;
    vec3 blur = vec3(0.0);
    float weight = 1.0 / float(BLUR_STEPS * 2 + 1);

    for (int i = -BLUR_STEPS; i <= BLUR_STEPS; ++i) {
        // Blur по X
        blur += texture(u_sampler2D, v_TexCoord + vec2(texelSize.x * float(i), 0.0)).rgb * weight;
        // Blur по Y
        blur += texture(u_sampler2D, v_TexCoord + vec2(0.0, texelSize.y * float(i))).rgb * weight;
    }

    // Перемножаем с базовым, чтобы сохранить «текущий» свет
    //base *= 0.8;   // немного ослабляем
    //base += blur * 0.2; // добавляем размытость

    // 4. Добавляем «глёу» (выделяем яркие участки)
    //float bright = max(max(base.r, base.g), base.b);
    //if (bright > GLOW_THRESHOLD) {
    //    base += vec3(GLOW_STRENGTH) * (bright - GLOW_THRESHOLD) / (1.0 - GLOW_THRESHOLD);
    //}

    // 5. Смешиваем с предыдущим кадром, чтобы получить эффект «затухания»
    //vec3 final = mix(base, prev, FADE_ALPHA);

    // 6. Добавляем лёгкую «пыль» (шумишь по времени)
    //float noise = fract(sin(dot(v_TexCoord.xy, vec2(12.9898,78.233))) * 43758.5453);
    //final += noise * 0.02;

    fragColor = vec4(base, 1.0);
}
`