import { definePlugin } from 'sanity'
import { frontendUrl, projectId } from '~/sanity/env'

export const csSession = definePlugin(() => {
  const rawToken = typeof localStorage !== 'undefined' ? localStorage.getItem(`__studio_auth_token_${projectId}`) : undefined
  
  if (!rawToken) {
    return {}
  }

  const token = JSON.parse(rawToken).token as string
  
  fetch(`${frontendUrl}/api/setSanityToken`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      projectId,
    }),
    credentials: 'include',
  }).catch((err) => {})

  return {}
})
