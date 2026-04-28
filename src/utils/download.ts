export function download (filename: string, data: string | Blob | {}) {
  const blob = data instanceof Blob 
    ? data 
    : typeof data === 'string' || data instanceof String 
    ? new Blob([data.toString()], { type: 'text/plain' })
    : new Blob([JSON.stringify(data)], { type: 'application/json' })

  const link = document.createElement('a')
  const urlObject = window.URL.createObjectURL(blob)
  link.href = urlObject
  link.setAttribute('download', filename)
  document.body.appendChild(link)
  link.click()
  window.URL.revokeObjectURL(urlObject)
  document.body.removeChild(link)
  
}