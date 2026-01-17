import axios from "axios"

export const API = {
  async getProjects () {
    const projects = await axios.get('https://localhost:7091/sprite-editor/projects')
    return projects.data
  }
}