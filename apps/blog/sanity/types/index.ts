import type { PortableTextBlock } from '@portabletext/types'
import type { Image } from 'sanity'

export interface PostPayload {
  title: string
  slug: string
  cover: {
    image: Image & {
      alt: string
      caption: string
    }
    lqip: string
    width: number
    height: number
  }
  intro: PortableTextBlock[]
  body: PortableTextBlock[]
  tags: string[]
}

export interface SlimPostPayload {
  title: string
  slug: string
  cover: {
    image: Image & {
      alt: string
      caption: string
    }
    lqip: string
    width: number
    height: number
  }
}