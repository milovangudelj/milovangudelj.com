import { NextRequest } from 'next/server'
import { revalidateTag } from 'next/cache'
import { parseBody } from 'next-sanity/webhook'

export async function POST(request: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<{ _type: string }>(
      request,
      process.env.SANITY_REVALIDATE_SECRET
    )

    if (!isValidSignature) {
      const message = 'Invalid signature'
      return Response.json(
        { message, isValidSignature, body },
        {
          status: 401,
        }
      )
    }

    if (!body?._type) {
      const message = 'Bad Request'
      return Response.json({ message, body }, { status: 400 })
    }

    await revalidateTag(body._type)

    return Response.json({ body, revalidated: true, now: Date.now() })
  } catch (err) {
    return Response.json((err as Error).message, { status: 500 })
  }
}
