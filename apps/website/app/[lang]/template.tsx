'use client'

import { useEffect } from 'react'
import { incrementViewCount } from '~/lib/viewCount'

export default function RootTemplate({ children }: { children: React.ReactNode }) {
  // const [hue, setHue] = useState(0)

  useEffect(() => {
    // setHue(Math.floor(Math.random() * 360))
    incrementViewCount()
  }, [])

  return (
    <>
      {children}
      {/* <span
        className="fixed bottom-0 right-0 m-4 block h-8 w-8 rounded"
        style={{
          background: `hsl(${hue}deg 43% 66%)`,
        }}
      ></span> */}
    </>
  )
}
