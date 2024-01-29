import { headers } from 'next/headers'

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
  })

  return new Response('OK', { status: 200, headers: resHeaders })
}

export async function OPTIONS() {
  const resHeaders = new Headers({
    'Access-Control-Allow-Origin':
      process.env.NODE_ENV === 'production' ? 'https://studio.milovangudelj.com' : '*',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Headers': 'Authorization',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  })

  return new Response('OK', { status: 200, headers: resHeaders })
}