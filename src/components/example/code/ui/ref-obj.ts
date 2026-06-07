import { ref } from "vue"

export type RefObj<T> = { value: T }

export function createRefObj <T>(value: T):  RefObj<T> { return ref<T>(value) as RefObj<T>}