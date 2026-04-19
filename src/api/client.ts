import { Urls } from "./urls";

export type OkResult = { ok: boolean }

export class Client {
  static async get<T> (url: string) {
    const resp = await fetch(Urls.setUrl(url))
    if (!resp.ok) {
      const text = `Request in not ok. ${resp.status} ${resp.statusText}`
      alert(text)
      return new Error(text)
    }

    const result = await resp.json()
    return result as T
  }
}