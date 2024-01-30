import { headers } from 'next/headers'
import { validateSanityToken } from '~/utils/validateSanityToken'

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
  const authHeader = headers().get('Authorization')

  if (!authHeader) {
    return new Response('Missing auth token in request!', { status: 401 })
  }

  const token = authHeader.slice(7)

  const isValid = await validateSanityToken(token)

  if (!isValid) {
    return new Response('Invalid auth token!', { status: 401 })
  }

  // Set a simple flag as a cookie
  const domain = process.env.NODE_ENV === 'production' ? 'domain=.milovangudelj.com; ' : ''
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  const cookie = `sanitySession=${token}; ${domain}path=/; expires=${expires}; Secure; SameSite=Strict`
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