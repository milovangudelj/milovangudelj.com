import { getNowPlaying } from '~lib/spotify'

export const runtime = 'edge'

export async function GET() {
  const song = await getNowPlaying()

  if (!song || !song.item) {
    return new Response(JSON.stringify({ isPlaying: false }), {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
    })
  }

  const isPlaying = song.is_playing
  const title = song.item.name
  const artist = song.item.artists.map((_artist: any) => _artist.name).join(', ')
  const artistId = song.item.artists[0].id
  const album = song.item.album.name
  const albumImageUrl = song.item.album.images[0].url
  const songUrl = song.item.external_urls.spotify

  return new Response(
    JSON.stringify({
      album,
      albumImageUrl,
      artist,
      artistId,
      isPlaying,
      songUrl,
      title,
    }),
    {
      status: 200,
      headers: {
        'content-type': 'application/json',
        'cache-control': 'public, s-maxage=60, stale-while-revalidate=30',
      },
    }
  )
}
