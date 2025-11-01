/** Source: https://easings.net/#easeOutSine */
export function easeOutSine(x: number): number {
  return Math.sin((x * Math.PI) / 2);
}