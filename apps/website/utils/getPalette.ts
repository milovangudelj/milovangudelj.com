import { Color, colors, getColorName, shuffleAll } from '~utils/getColors'

export interface ColorCombo {
  bg: Color
  fg: Color
  text: Color
}

export const combos: ColorCombo[] = [
  {
    bg: 'purple',
    fg: 'yellow',
    text: 'black',
  },
  {
    bg: 'light-cyan',
    fg: 'yellow',
    text: 'black',
  },
  {
    bg: 'yellow',
    fg: 'sp-purple',
    text: 'black',
  },
  {
    bg: 'orange',
    fg: 'light-green',
    text: 'black',
  },
  {
    bg: 'green',
    fg: 'yellow',
    text: 'black',
  },
  {
    bg: 'lavender',
    fg: 'yellow',
    text: 'black',
  },
  {
    bg: 'lilla',
    fg: 'sp-purple',
    text: 'black',
  },
  {
    bg: 'salmon',
    fg: 'sp-purple',
    text: 'black',
  },
  {
    bg: 'light-green',
    fg: 'green',
    text: 'black',
  },
  {
    bg: 'sp-pink',
    fg: 'sp-purple',
    text: 'black',
  },
  {
    bg: 'sp-orange',
    fg: 'sp-purple',
    text: 'black',
  },
  {
    bg: 'sp-yellow',
    fg: 'sp-purple',
    text: 'black',
  },
  {
    bg: 'sp-black',
    fg: 'green',
    text: 'lilla',
  },
  {
    bg: 'sp-purple',
    fg: 'yellow',
    text: 'white',
  },
]

export type Palette = {
  bg: string
  fg: string
  text: string
  artists: string[]
  tracks: string[]
}

export const getPalette = (color?: Color, exclude: Color[] = []): Palette => {
  const combo =
    combos.find((c) => c.bg === color) || combos[Math.floor(Math.random() * combos.length)]

  const artists = shuffleAll([
    ...exclude,
    combo?.bg ?? 'black',
    combo?.fg ?? 'black',
    'black',
    'white',
    'sp-brand',
  ])
  const tracks = shuffleAll([
    ...exclude,
    combo?.bg ?? 'black',
    combo?.fg ?? 'black',
    'black',
    'white',
    'sp-brand',
    getColorName(artists[0] ?? 'black'),
  ])

  const palette = {
    bg: colors[combo?.bg ?? 'black'],
    fg: colors[combo?.fg ?? 'black'],
    text: colors[combo?.text ?? 'black'],
    artists,
    tracks,
  }

  return palette
}
