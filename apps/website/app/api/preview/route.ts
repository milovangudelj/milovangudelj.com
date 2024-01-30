import { draftMode, cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { validateSanityToken } from '~/utils/validateSanityToken'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug')

  const token = cookies().get('sanitySession')?.value

  if (!token) {
    return Response.redirect(new URL('/', request.url))
  }

  const isValid = await validateSanityToken(token)

  if (!isValid) {
    return Response.redirect(new URL('/', request.url))
  }

  draftMode().enable()

  redirect(slug ?? '/')
}
