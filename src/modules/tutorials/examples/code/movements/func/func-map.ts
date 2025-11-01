import { easeInElastic } from "./easeInElastic"
import { easeInOutCirc } from "./easeInOutCirc"
import { easeInOutElastic } from "./easeInOutElastic"
import { easeInOutQuad } from "./easeInOutQuad"
import { easeInOutSine } from "./easeInOutSine"
import { easeInQuad } from "./easeInQuad"
import { easeInSine } from "./easeInSine"
import { easeOutBounce } from "./easeOutBounce"
import { easeOutElastic } from "./easeOutElastic"
import { easeOutQuad } from "./easeOutQuad"

const funcMap: Map<string, (t: number)=>number> = new Map([
    ['easeInOutCirc', easeInOutCirc], 
    ['easeInOutElastic', easeInOutElastic], 
    ['easeInOutQuad', easeInOutQuad], 
    ['easeInOutSine', easeInOutSine], 
    ['easeInQuad', easeInQuad], 
    ['easeInElastic', easeInElastic], 
    ['easeInElastic', easeInSine], 
    ['easeOutBounce', easeOutBounce], 
    ['easeOutElastic', easeOutElastic], 
    ['easeOutQuad', easeOutQuad], 
    ['easeInSine', easeInSine]
  ])

export { funcMap }