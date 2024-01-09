import { Suspense } from 'react'
import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

import { Container } from '~/components/Container'
import { Section } from '~/components/Section'
import { Form } from './form'
import { Entries } from './entries'
import { EntriesBones } from './entries_bones'

import { Database } from '~/types/supabase'

export const dynamic = 'force-dynamic'

export default async function GuestbookPage() {
  const supabase = createServerComponentClient<Database>({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const entriesQuery = supabase
    .from('guestbook')
    .select('id, created_at, created_by, body, author_pfp, is_published')
    .order('created_at', { ascending: false })

  const { data: entries } =
    session?.user.id === process.env.SUPABASE_OWNER_ID
      ? await entriesQuery
      : await entriesQuery.filter('is_published', 'eq', true)

  return (
    <>
      <Section>
        <Container>
          <h1 className="text-h1-mobile md:text-d1-mobile 2xl:text-d1 mb-16">Sign the guestbook</h1>
          <Form authenticated={session ? true : false} />
        </Container>
      </Section>
      <Section>
        <Container>
          <ul className="flex max-w-[800px] flex-col gap-8">
            <Suspense fallback={<EntriesBones entries={entries ?? []} />}>
              <Entries
                entries={entries ?? []}
                isOwner={session?.user.id === process.env.SUPABASE_OWNER_ID}
              />
            </Suspense>
          </ul>
        </Container>
      </Section>
    </>
  )
}
