import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

import { assertValue } from '~/utils/assertValue'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const supabase = createRouteHandlerClient({ cookies })
    await supabase.auth.exchangeCodeForSession(code)
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(
    `${assertValue(
      process.env.NEXT_PUBLIC_WEBSITE_URL,
      'Environement variable missing: process.env.NEXT_PUBLIC_WEBSITE_URL'
    )}/guestbook`
  )
}
