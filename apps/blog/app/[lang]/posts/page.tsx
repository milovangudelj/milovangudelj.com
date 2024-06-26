import Image from 'next/image'
import Link from 'next/link'

import { Section, Container } from '@repo/ui'
import { type Locale } from '@repo/i18n'
import { getData } from '@repo/sanity/fetch'
import { urlForImage } from '@repo/sanity/image'
import { PostPayload, postsQuery } from '@repo/sanity/queries'

export default async function PostsPage({ params: { lang } }: { params: { lang: Locale } }) {
  const posts = await getData<PostPayload[]>(postsQuery, { lang })

  return (
    <>
      <Section>
        <Container>
          <h1 className="text-h1-mobile md:text-d1-mobile 2xl:text-d1 mb-16">Latest posts</h1>
          <ol className="flex justify-between">
            {posts.slice(0, 3).map((post) => (
              <li key={post.slug}>
                <Image
                  src={urlForImage(post.cover.image).url()}
                  className="mb-8 aspect-video w-[384px] rounded-2xl border border-white/[0.06] object-cover shadow-2xl"
                  sizes="768px"
                  quality={100}
                  alt={post.cover.image.alt ?? post.cover.image.caption}
                  title={post.cover.image.alt ?? post.cover.image.caption}
                  width={post.cover.width}
                  height={post.cover.height}
                  placeholder="blur"
                  blurDataURL={post.cover.lqip}
                />
                <div className="flex flex-col">
                  <Link
                    href={`/posts/${post.slug}`}
                    className="text-sub-heading-mobile md:text-sub-heading group w-fit font-medium"
                  >
                    {post.title}{' '}
                    <span className="group-hover:text-yellow inline-block text-white transition will-change-transform group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                  <span className="text-label-md text-light-me inline-block max-w-full truncate">
                    {46} views
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </Section>
      <Section>
        <Container>
          <h2 className="text-h2-mobile md:text-h2 mb-16">All posts</h2>
          <ol>
            {posts.slice(3).map((post) => (
              <li key={post.slug} className="mb-16 flex gap-16 last:mb-0">
                <div className="flex flex-1 flex-col">
                  <Link
                    href={`/posts/${post.slug}`}
                    className="text-sub-heading-mobile md:text-sub-heading group w-fit font-medium"
                  >
                    {post.title}{' '}
                    <span className="group-hover:text-yellow inline-block text-white transition will-change-transform group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                  <span className="text-label-md text-light-me inline-block max-w-full truncate">
                    {46} views
                  </span>
                  <p className="text-light-me mt-8 line-clamp-3">
                    Lorem ipsum is placeholder text commonly used in the graphic, print, and
                    publishing industries for previewing layouts and visual mockups. Lorem ipsum is
                    placeholder text commonly used in the graphic, print, and publishing industries
                    for previewing layouts and visual mockups.
                  </p>
                </div>
                <Image
                  className="aspect-video w-[450px] rounded-2xl border border-white/[0.06] object-cover shadow-2xl"
                  src={urlForImage(post.cover.image).url()}
                  sizes="900px"
                  quality={100}
                  alt={post.cover.image.alt ?? post.cover.image.caption}
                  title={post.cover.image.alt ?? post.cover.image.caption}
                  width={post.cover.width}
                  height={post.cover.height}
                  placeholder="blur"
                  blurDataURL={post.cover.lqip}
                />
              </li>
            ))}
          </ol>
        </Container>
      </Section>
    </>
  )
}
