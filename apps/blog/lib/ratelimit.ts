import { Ratelimit } from '@upstash/ratelimit'
import { kv } from '@vercel/kv'
import { NextResponse } from 'next/server'

export const ratelimit = new Ratelimit({
  redis: kv,
  // 5 requests from the same IP in 10 seconds
  limiter: Ratelimit.slidingWindow(5, '10 s'),
})

export const rateLimitedResponse = ({
  limit,
  remaining,
  reset,
}: {
  limit: number
  remaining: number
  reset: number
}) => {
  return new NextResponse('Too many requests', {
    status: 429,
    headers: {
      'x-ratelimit-limit': limit.toString(),
      'x-ratelimit-remaining': remaining.toString(),
      'x-ratelimit-reset': reset.toString(),
    },
  })
}
