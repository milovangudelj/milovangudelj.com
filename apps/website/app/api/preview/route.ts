import { draftMode, cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { validateSanityToken } from '~/utils/validateSanityToken'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug')
  const secret = searchParams.get('secret')

  const token = cookies().get(`sanitySession_${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`)?.value

  if (
    (token && (await validateSanityToken(token))) ||
    (secret && secret === process.env.SANITY_PREVIEW_SECRET)
  ) {
    draftMode().enable()
    redirect(slug ?? '/')
  }

  redirect(
    `/?${new URLSearchParams({ toastMessage: `You're not allowed to view previews for this website.`, toastType: 'error' }).toString()}`
  )
}
