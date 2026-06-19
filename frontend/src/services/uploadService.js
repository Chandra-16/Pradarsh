import { auth } from './firebase'

// Ensure we point to your live Hugging Face backend
const API_URL = import.meta.env.VITE_API_URL || 'https://m-prabhath-pradarsh-api.hf.space'

const uploadService = {
  // If thumbnail is still using this service, route it to the backend too
  async uploadThumbnail(file) {
    const user = auth.currentUser
    if (!user) throw new Error('Not authenticated')
    const token = await user.getIdToken()

    const formData = new FormData()
    formData.append('file', file)

    const response = await fetch(`${API_URL}/uploads/thumbnail`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    })

    if (!response.ok) {
      const err = await response.json()
      throw new Error(err.detail || 'Thumbnail upload failed')
    }

    return await response.json()
  },

  async uploadScreenshots(files) {
    const user = auth.currentUser
    if (!user) throw new Error('Not authenticated')
    const token = await user.getIdToken()

    const urls = []
    const paths = []

    for (const file of files) {
      const formData = new FormData()
      formData.append('file', file)

      // Send the file securely to your Python backend
      const response = await fetch(`${API_URL}/uploads/screenshots`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      })

      if (!response.ok) {
        const err = await response.json()
        throw new Error(err.detail || 'Screenshot upload failed')
      }

      const data = await response.json()
      urls.push(data.url)
      paths.push(data.path)
    }

    return { urls, paths, count: urls.length }
  },
}

export default uploadService