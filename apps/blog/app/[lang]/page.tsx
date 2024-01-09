import { Section } from '~components/Section'
import { Container } from '~components/Container'

import { getDictionary } from '~utils/getDictionary'
import { Locale } from '~/i18n.config'
import Image from 'next/image'
import Link from 'next/link'
import { getPosts } from '~/sanity/lib/client'
import { urlForImage } from '~/sanity/lib/image'

const Home = async ({ params: { lang } }: { params: { lang: Locale } }) => {
  const posts = await getPosts(lang)

  const dictionary = await getDictionary(lang)

  return (
    <>
      <Section className="relative text-white">
        <Container as="main" className="relative">
          <h1 className="text-h1-mobile md:text-d1-mobile 2xl:text-d1 mb-16 max-w-[600px]">
            {dictionary.Home.heroTitle}
          </h1>
          <p className="text-sub-heading-mobile md:text-sub-heading max-w-[500px]">
            {dictionary.Home.heroParagraph}
          </p>
          <Image
            src="/images/icedcoffee.webp"
            sizes="1200px"
            width={600}
            height={400}
            alt="A picture of a mug of iced coffee as seen from above."
            className="absolute right-0 top-1/2 -translate-y-1/2 rounded-2xl border border-white/[0.06] object-cover shadow-2xl"
          />
        </Container>
      </Section>
      <Section>
        <Container>
          <h2 className="text-h2-mobile xl:text-h2 mb-16">Latest posts</h2>
          <ol className="flex justify-between">
            {posts.slice(0, 3).map((post) => (
              <li key={post.slug} className="">
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
    </>
  )
}

export default Home
