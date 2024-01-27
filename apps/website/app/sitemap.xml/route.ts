import { NextResponse } from 'next/server'
import { generateSiteMap } from '~/lib/sitemap'

export async function GET() {
  const sitemap = await generateSiteMap()

  return new NextResponse(sitemap, {
    status: 200,
    headers: { 'Content-Type': 'text/xml' },
  })
}
