'use client'

import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { GithubLogo } from '@phosphor-icons/react'

import { Button } from '@repo/ui'

import { Database } from '~/types/supabase'

type FormData = {
  signature: string
}

export function Form({ authenticated }: { authenticated?: boolean }) {
  const router = useRouter()
  const supabase = createClientComponentClient<Database>()
  const [limitReached, setLimitReached] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm<FormData>()

  const onSubmit = handleSubmit((data, e) => {
    e?.preventDefault()
    if (!authenticated) return

    fetch('/api/guestbook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        signature: data.signature,
      }),
    }).then((res) => {
      if (res.status === 429) {
        setLimitReached(true)
      } else {
        setLimitReached(false)
      }
    })

    reset()
  })

  async function handleSignIn() {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/auth/callback`,
      },
    })

    router.refresh()
  }

  async function handleSignOut() {
    await supabase.auth.signOut()
    clearErrors()
    router.refresh()
  }

  return (
    <div className="flex max-w-[800px] flex-col gap-1">
      <form onSubmit={onSubmit} className="flex items-center gap-1 rounded-xl bg-white/[0.06] p-1">
        <input
          {...register('signature', {
            required: { value: true, message: 'This field is required' },
            maxLength: { value: 132, message: 'The message must be shorter than 132 carachters' },
          })}
          aria-invalid={errors.signature ? 'true' : 'false'}
          placeholder="Your message..."
          className="form-input text-body text-light-he placeholder:text-light-le focus:border-yellow focus:ring-yellow min-w-0 flex-1 rounded-lg border border-white/[0.06] bg-transparent px-4 py-2 transition"
        />
        {authenticated && (
          <Button type="submit" variant="primary">
            Sign
          </Button>
        )}
        {!authenticated && (
          <Button variant="secondary" type="button" onClick={handleSignIn}>
            <span>
              Sign in<span className="hidden md:inline"> with GitHub</span>
            </span>
            <span className="rounded-full bg-black p-2 text-white">
              <GithubLogo size={16} />
            </span>
          </Button>
        )}
      </form>
      <div className="text-label-md flex flex-1 items-baseline gap-2">
        {authenticated && (
          <button
            onClick={handleSignOut}
            className="text-light-me hover:text-light-he flex-none bg-transparent"
          >
            Sign out
          </button>
        )}
        {(errors.signature || limitReached) && (
          <>
            {authenticated && <span className="text-light-le">·</span>}
            <span className="text-tw-red">
              {limitReached ? 'You reached your limit. Slow down...' : errors.signature?.message}
            </span>
          </>
        )}
      </div>
    </div>
  )
}
