import { headers } from 'next/headers'
import { validateSanityToken } from '~/utils/validateSanityToken'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_SANITY_STUDIO_URL!,
  'Access-Control-Allow-Credentials': 'true',
  'Access-Control-Allow-Headers': 'Authorization',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

export async function POST(request: Request) {
  const authHeader = headers().get('Authorization')

  if (!authHeader) {
    return new Response('Missing auth token in request!', { status: 401 })
  }

  const token = authHeader.slice(7)

  const isValid = await validateSanityToken(token)

  if (!isValid) {
    return new Response('Invalid auth token!', { status: 401 })
  }

  const body = await request.json()
  const { projectId } = body

  if (!projectId) {
    return new Response('Missing projectId in request body!', { status: 400 })
  }

  // Set a simple flag as a cookie
  const domain =
    process.env.NODE_ENV === 'production'
      ? `domain=${process.env.NEXT_PUBLIC_SANITY_SESSION_DOMAIN}; `
      : ''
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  const cookie = `sanitySession_${projectId}=${token}; ${domain}path=/; expires=${expires}; Secure; SameSite=Strict`
  const resHeaders = new Headers({
    'Set-Cookie': cookie,
    ...CORS_HEADERS,
  })

  return new Response('All good.', { status: 200, headers: resHeaders })
}

export async function OPTIONS() {
  const resHeaders = new Headers(CORS_HEADERS)

  return new Response('All good.', { status: 200, headers: resHeaders })
}