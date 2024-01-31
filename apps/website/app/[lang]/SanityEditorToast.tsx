'use client'

import { useEffect } from 'react'
import { toast } from 'sonner'

const getCookieValue = (name: string) =>
  document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || ''

export const SanityEditorToast = () => {
  useEffect(() => {
    if (getCookieValue(`sanitySession_${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`)) {
      toast('You appear to be an editor.', {
        action: {
          label: 'Go to the Studio',
          // eslint-disable-next-line turbo/no-undeclared-env-vars
          onClick: () => window.open(process.env.NEXT_PUBLIC_SANITY_STUDIO_URL, '_blank'),
        },
        // unstyled: true,
        // classNames: {
        //   toast: 'bg-blue-400',
        //   title: 'text-red-400 text-2xl',
        //   description: 'text-red-400',
        //   actionButton: 'bg-zinc-400',
        //   cancelButton: 'bg-orange-400',
        //   closeButton: 'bg-lime-400',
        // },
      })
    }
  }, [])

  return null
}
