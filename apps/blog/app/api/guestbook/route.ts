import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import Filter from 'bad-words'
import { ClientOptions, OpenAI } from 'openai'

import { Database } from '~/types/supabase'
import { rateLimitedResponse, ratelimit } from '~/lib/ratelimit'

const openAIConfig: ClientOptions = {
  apiKey: process.env.OPENAI_API_KEY,
}
const openai = new OpenAI(openAIConfig)

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  const ip = request.ip ?? '127.0.0.1'
  const { success, pending, limit, reset, remaining } = await ratelimit.limit(ip)
  if (!success) return rateLimitedResponse({ limit, remaining, reset })

  const supabase = createRouteHandlerClient<Database>({ cookies })
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    return new NextResponse('Unauthorized! Please log in to sign the guestbook.', {
      status: 401,
    })
  }

  const { signature } = await request.json()

  if (!signature) {
    return new NextResponse('Bad Request: missing signature body...', {
      status: 400,
    })
  }

  const filter = new Filter()
  const cl1_signature = filter.clean(signature) // 1st level cleanup filter

  const response = await openai.completions.create({
    model: 'text-davinci-003',
    stream: false,
    temperature: 0,
    max_tokens: 300,
    prompt: `Censor the following message. Use asterisks to censor only profane words. \n\nMessage: "Holy shit that's crazy!"\nCensored: Holy **** that's crazy!\n\nMessage: "${cl1_signature}"\n\nCensored:`,
  })

  const cl2_signature = response.choices[0].text // 2nd level cleanup flter

  const { status, statusText } = await supabase.from('guestbook').insert({
    body: cl2_signature ?? cl1_signature,
    uncensored_body: signature,
    author_pfp: session.user!.user_metadata.avatar_url,
    created_by: session.user!.user_metadata.name,
    is_published: true,
  })

  return NextResponse.json({ status, statusText })
}

export async function PATCH(request: NextRequest) {
  const ip = request.ip ?? '127.0.0.1'
  const { success, pending, limit, reset, remaining } = await ratelimit.limit(ip)
  if (!success) return rateLimitedResponse({ limit, remaining, reset })

  const supabase = createRouteHandlerClient<Database>({ cookies })
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session || session.user.id !== process.env.SUPABASE_OWNER_ID) {
    return new NextResponse('Unauthorized! Please log in as the owner to update the guestbook.', {
      status: 401,
    })
  }

  const { entry_id, entry_is_published } = await request.json()

  if (!entry_id || entry_is_published === undefined || entry_is_published === null) {
    return new NextResponse('Bad Request: missing signature body...', {
      status: 400,
    })
  }

  const { status, statusText, error } = await supabase
    .from('guestbook')
    .update({ is_published: entry_is_published })
    .eq('id', entry_id)

  return NextResponse.json({ status, statusText })
}
