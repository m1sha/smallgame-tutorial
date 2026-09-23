import { describe, it, expect } from 'vitest'
import { Random} from '../src/utils/random'


describe ('Random', () => {
 it('Same seed same result', () => {
    const r1 = new Random(1)
    const r2 = new Random(1)
    expect(r1.next()).toBe(r2.next())
  })

  it('Different seed Different result', () => {
    const r1 = new Random()
    const r2 = new Random()
    expect(r1.next()).not.toBe(r2.next())
  })
  
})