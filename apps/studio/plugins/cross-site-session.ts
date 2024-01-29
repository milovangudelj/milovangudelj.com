import { definePlugin } from 'sanity'
import { frontendUrl, projectId } from '../env'

const getAuthToken = () => localStorage.getItem(`__studio_auth_token_${projectId}`)

export const csSession = definePlugin(() => {
  const token = getAuthToken()

  if (!token) {
    console.error('Missing Sanity auth token')
    return {}
  }

  fetch(`${frontendUrl}/api/setSanityToken`, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: 'include',
  })
    .then((res) => {
      if (res.ok) {
        console.log('Successfully set Sanity token')
      } else {
        console.error('Failed to set Sanity token')
      }
    })
    .catch((err) => {
      console.error('Failed to set Sanity token', err)
    })

  return {}
})
