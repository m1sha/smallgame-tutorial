import axios from "axios"
import { MediaFileDto, JsonDocumentDto } from "./dto"
import { uuidv4 } from "../uuidv4"

const url = 'https://localhost:60002'

const RemoteStorage = {
  getMediaUrl (name: string) {
    return `${url}/media/name/${name}`
  },

  async mediaFileList () {
    const data = await get<MediaFileDto[]>(`${url}/media`, [])
    return data.map(p => new MediaFile(p))
  },

  async documentList () {
    const data = await get<JsonDocumentDto[]>(`${url}/documents`, [])
    return data.map(p => new JsonDocument(p))
  }
}


async function get<T> (url: string, defaultValue: T) {
  const res = await axios.get(url)
   if (res.status !== 200) {
      console.log(`${res.status}. ${res.statusText}`)
      return defaultValue
    }
    
  return res.data as T
}

async function remove (url: string) {
  const res = await axios.delete(url)
  if (res.status !== 200) {
    console.log(`${res.status}. ${res.statusText}`)
    return
  }
}

async function upload (url: string, data: any, file: File) {
  const formData = new FormData()
  for (const i in data) formData.append(i, data[i])
  formData.append('file', file)
  const res = await  axios.post(url, formData)
   if (res.status !== 200) {
    console.log(`${res.status}. ${res.statusText}`)
    return
  }
  return res.data
}

abstract class RemoteFile {
  protected remote: boolean
  id: string
  name: string
  contentType: string
  protected abstract route: string
  content?: any

  async load<T> () {
    return get<T>(`${url}/documents/${this.id}`, null)
  }

  async save () {
    if (this.remote)
      await this.delete()
    await upload(`${url}/api/documents/`, { name: this.name }, createFile(this.id, JSON.stringify(this.content), 'application/json'))
  }

  async delete () {
    remove(`${url}/api/documents/${this.id}`)
  }
}

function createFile(fileName: string, content: string, contentType: string) {
  const blob = new Blob([content], { type: contentType})
  return new File([blob], fileName, { type: contentType })
}



export class MediaFile extends RemoteFile  {
  protected route: string = 'media'
  size: number
  createDate: Date

  constructor (dto: MediaFileDto) {
    super()
    this.id = dto.id
    this.name = dto.name
    this.contentType = dto.contentType
    this.size = dto.size
    this.createDate = dto.createDate
    this.remote = true
  }

  static create (name: string, contentType: string) {
    const result = new MediaFile({ id: uuidv4(), name, size: 0, contentType, createDate: new Date() })
    result.remote = false
    return result
  }
}


export class JsonDocument extends RemoteFile {
  protected route: string = 'documents'
  constructor (dto:JsonDocumentDto) {
    super ()
    this.id = dto.id
    this.name = dto.name
    this.contentType = 'application/json'
    this.size = dto.size
    this.createDate = dto.createDate
    this.remote = true
  }
  size: number
  createDate: Date
  static create (name: string, content?: any) {
    const result = new JsonDocument({ id: uuidv4(), name: name, size: 0, createDate: new Date() })
    result.remote = false
    result.content = content
    return result
  }
}


export { RemoteStorage }