'use client'

import { ArrowSquareOut, Check, Info, Pen, Warning, WarningOctagon } from '@phosphor-icons/react'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { toast } from 'sonner'

const getCookieValue = (name: string) =>
  document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || ''

export const SanityEditorToast = () => {
  const searchParams = useSearchParams()

  const toastMessage = searchParams.get('toastMessage')
  const toastType = searchParams.get('toastType') as 'error' | 'success' | 'info' | 'warning'

  useEffect(() => {
    if (toastMessage) {
      toast[toastType](<Toast message={toastMessage} type={toastType} />)
      return
    }

    if (getCookieValue(`sanitySession_${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`)) {
      toast(
        <Toast
          message="You appear to be an editor."
          action={{
            type: 'link',
            label: 'Studio',
            onClick: () => window.open(process.env.NEXT_PUBLIC_SANITY_STUDIO_URL, '_blank'),
          }}
        />
      )
    }
  }, [])

  return null
}

const Toast = ({
  message,
  type,
  action,
}: {
  message: string
  type?: 'error' | 'success' | 'info' | 'warning'
  action?: Action & { type?: 'edit' | 'link' }
}) => {
  const icons = {
    error: <WarningOctagon className="text-orange h-6 w-6" />,
    success: <Check className="h-6 w-6" />,
    info: <Info className="h-6 w-6" />,
    warning: <Warning className="h-6 w-6" />,
  }

  return (
    <div className="group relative flex w-full flex-col items-center rounded-lg bg-black/20 md:flex-row">
      {type && (
        <div className="flex-none self-stretch rounded-tl-[7px] bg-black/40 px-4 py-2 max-md:rounded-tr-[7px] md:rounded-bl-[7px]">
          {icons[type]}
        </div>
      )}
      <span className="relative flex flex-1 items-center self-stretch break-words border-white/[0.06] px-4 py-2 max-md:border-t md:border-l lg:line-clamp-3">
        {message}
      </span>
      {action && <ToastAction {...action} />}
    </div>
  )
}

const ToastAction = ({ type = 'link', label, onClick }: Action & { type?: 'edit' | 'link' }) => {
  const icons = {
    edit: <Pen className="h-4 w-4" />,
    link: <ArrowSquareOut className="h-4 w-4" />,
  }

  return (
    <button
      onClick={onClick}
      className="flex flex-none items-center rounded-br-[7px] bg-black/40 px-4 py-2 hover:bg-black/60 max-md:rounded-bl-[7px] md:rounded-tr-[7px]"
    >
      <span className="mr-2">{label}</span>
      {icons[type]}
    </button>
  )
}

interface Action {
  label: React.ReactNode
  // eslint-disable-next-line no-unused-vars
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  actionButtonStyle?: React.CSSProperties
}