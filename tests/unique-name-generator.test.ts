import { describe, it, expect } from 'vitest'
import { UniqueNameGenerator} from '../src/utils/random'
describe ('UniqueNameGenerator', () => {
 it('next() must gets 1000 unique names', () => {
    const random = new UniqueNameGenerator()
    const set = new Set<string>()
    let allUnique = true
    for (let i = 0; i < 1000; i++) {
      const name = random.next()
      if (set.has(name)) {
        allUnique = false
        break
      }
      set.add(name)
    }
    expect(allUnique).toBe(true)
  })

  it('After 1000 next() next next() not equal the first', () => {
    const random = new UniqueNameGenerator()
    
    let name = random.next()
    for (let i = 1; i < 1000; i++);
    expect(name === random.next()).toBe(false)
  })
})