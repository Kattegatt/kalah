import { baseUrl } from './endpoints.js'

class GamesRequests {
  static async getAllByToken(token) {
    const response = await fetch(`${baseUrl}/games/filter`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    return response.json()
  }

  static async patch(id, token, data) {
    const response = await fetch(`${baseUrl}/games/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })
    return response.json()
  }
}

export default new GamesRequests()
