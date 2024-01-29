import { headers } from 'next/headers'

export async function POST() {
  const headersList = headers()
  const authHeader = headersList.get('Authorization')

  if (!authHeader) {
    return new Response('Unauthorized', { status: 401 })
  }

  // Set a simple flag as a cookie
  const cookie = `loggedInStudio=true; path=/; Secure; SameSite=Strict`
  const resHeaders = {
    'Set-Cookie': cookie,
  }

  return new Response('OK', { status: 200, headers: resHeaders })
}
