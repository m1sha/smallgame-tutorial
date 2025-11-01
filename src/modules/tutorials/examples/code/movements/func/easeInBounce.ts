import { easeOutBounce } from "./easeOutBounce"
/** Source: https://easings.net/#easeInBounce */
export function easeInBounce(x: number): number {
return 1 - easeOutBounce(1 - x);
}