import { headers } from 'next/headers'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin':
    process.env.NODE_ENV === 'production'
      ? 'https://studio.milovangudelj.com'
      : 'http://localhost:3333',
  'Access-Control-Allow-Credentials': 'true',
  'Access-Control-Allow-Headers': 'Authorization',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

export async function POST() {
  const headersList = headers()
  const authHeader = headersList.get('Authorization')

  if (!authHeader) {
    return new Response('Unauthorized', { status: 401 })
  }

  // Set a simple flag as a cookie
  const cookie = `loggedInStudio=true; path=/; Secure; SameSite=Strict`
  const resHeaders = new Headers({
    'Set-Cookie': cookie,
    ...CORS_HEADERS,
  })

  return new Response('OK', { status: 200, headers: resHeaders })
}

export async function OPTIONS() {
  const resHeaders = new Headers(CORS_HEADERS)

  return new Response('OK', { status: 200, headers: resHeaders })
}