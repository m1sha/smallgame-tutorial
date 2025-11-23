import { easeInBounce } from "./easeInBounce"
import { easeInElastic } from "./easeInElastic"
import { easeInOutBounce } from "./easeInOutBounce"
import { easeInOutCirc } from "./easeInOutCirc"
import { easeInOutElastic } from "./easeInOutElastic"
import { easeInOutQuad } from "./easeInOutQuad"
import { easeInOutSine } from "./easeInOutSine"
import { easeInQuad } from "./easeInQuad"
import { easeInSine } from "./easeInSine"
import { easeOutBounce } from "./easeOutBounce"
import { easeOutElastic } from "./easeOutElastic"
import { easeOutQuad } from "./easeOutQuad"
import { easeOutSine } from "./easeOutSine"

const funcMap: Map<string, (t: number)=>number> = new Map([
    ['easeInBounce', easeInBounce], 
    ['easeInElastic', easeInElastic], 
    ['easeInOutBounce', easeInOutBounce], 
    ['easeInOutCirc', easeInOutCirc], 
    ['easeOutElastic', easeOutElastic], 
    ['easeInOutElastic', easeInOutElastic], 
    ['easeInOutQuad', easeInOutQuad], 
    ['easeInOutSine', easeInOutSine], 
    ['easeInQuad', easeInQuad], 
    ['easeInElastic', easeInElastic], 
    ['easeInElastic', easeInSine], 
    ['easeOutBounce', easeOutBounce], 
    ['easeOutQuad', easeOutQuad], 
    ['easeInSine', easeInSine],
    ['easeOutSine', easeOutSine]
  ])

const Ease = {
  names : () => [...funcMap.keys()],
  get: (name: string) => funcMap.get(name)!
}

export { funcMap, Ease }

