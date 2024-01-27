'use client'

import { Eye, EyeClosed } from '@phosphor-icons/react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import { Database } from '~/types/supabase'

type GuestbookEntry = Omit<Database['public']['Tables']['guestbook']['Row'], 'uncensored_body'>

export const Entries = ({
  entries: initialEntries,
  isOwner,
}: {
  entries: GuestbookEntry[]
  isOwner: boolean
}) => {
  const [entries, setEntries] = useState(initialEntries)
  const supabase = createClientComponentClient<Database>()

  useEffect(() => {
    setEntries(initialEntries)
  }, [initialEntries])

  useEffect(() => {
    const newEntry = supabase
      .channel('Guestbook entry added')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'guestbook',
        },
        (payload) => {
          setEntries((entries) => [payload.new as GuestbookEntry, ...entries])
        }
      )
      .subscribe()

    const updatedEntry = supabase
      .channel('Guestbook entry updated')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'guestbook',
        },
        (payload) => {
          const updatedEntry = payload.new as GuestbookEntry

          let updateApplied = false

          const newEntries = entries
            .map((entry) => {
              if (entry.id === updatedEntry.id) {
                updateApplied = true
                return updatedEntry
              }

              return entry
            })
            .filter((entry) => entry.is_published === true || isOwner)

          if (!updateApplied) {
            setEntries(
              [updatedEntry, ...entries]
                .filter((entry) => entry.is_published === true)
                .sort((a, b) => (new Date(b.created_at) > new Date(a.created_at) ? 1 : -1))
            )
            return
          }

          setEntries(newEntries)
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(newEntry)
      supabase.removeChannel(updatedEntry)
    }
  }, [supabase, setEntries, entries, isOwner])

  const handleVisibilityToggle = (id: string, is_published: boolean, new_is_published: boolean) => {
    fetch('/api/guestbook', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        entry_id: id,
        entry_is_published: new_is_published,
      }),
    })
  }

  return (
    <>
      {entries.length !== 0 ? (
        entries.map(({ id, created_by, author_pfp, body, is_published }) => (
          <li
            key={id}
            className="group relative flex w-fit flex-col items-center rounded-lg border border-white/[0.16] bg-black/20 md:flex-row"
          >
            <div className="flex-none self-stretch rounded-tl-[7px] bg-black/40 px-4 py-2 max-md:rounded-tr-[7px] md:rounded-bl-[7px]">
              <div className="flex items-center gap-3">
                <Image
                  src={author_pfp}
                  alt={created_by}
                  sizes="64px"
                  width={460}
                  height={460}
                  className="h-8 w-8 rounded-full border border-white/[0.06]"
                />
                <span className="text-body text-light-me">{created_by}</span>
              </div>
            </div>
            <p className="text-body text-light-he relative flex items-center self-stretch break-words border-white/[0.06] px-4 py-2 max-md:border-t md:border-l lg:line-clamp-3">
              {body}
            </p>
            {isOwner && (
              <button
                className={`bg-noise absolute right-0 top-0 hidden h-6 w-6 -translate-y-1/2 translate-x-1/2 items-center justify-center overflow-hidden rounded-full transition ${
                  is_published
                    ? 'text-light-he border border-white/[0.16] bg-black'
                    : 'text-light-le border border-white/[0.16] bg-black'
                } group-hover:flex`}
                onClick={() => handleVisibilityToggle(id, is_published, !is_published)}
              >
                {is_published ? <Eye size={16} /> : <EyeClosed size={16} />}
              </button>
            )}
          </li>
        ))
      ) : (
        <p className="text-body text-light-me">No entries yet. You might be the first one...</p>
      )}
    </>
  )
}
