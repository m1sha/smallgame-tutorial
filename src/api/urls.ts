export const Urls = {
  serverUrl: 'http://localhost:3000',
  setUrl (url: string) {
    const locUrl = url.startsWith('/') ? url.substring(1) : url
    return `${Urls.serverUrl}/api/${locUrl}`
  }
}