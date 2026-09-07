import { reactive } from "vue"

export function createReactiveData <T extends {}>(data: T): T {
  return reactive(data) as T
}