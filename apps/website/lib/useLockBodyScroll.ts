import { useIsomorphicLayoutEffect } from '~utils/useIsomorphicLayoutEffect'

export const useLockBodyScroll = () => {
  useIsomorphicLayoutEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow

    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = originalStyle
    }
  }, [])
}
