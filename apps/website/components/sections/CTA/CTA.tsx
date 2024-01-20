import { ComponentProps } from 'react'

import { Container, Section } from '@repo/ui'
import { type Locale, getDictionary } from '@repo/i18n'

export const CTA = async ({
  title,
  description,
  lang,
  className = '',
  ...props
}: ComponentProps<'section'> & {
  title?: string
  description?: string
}) => {
  const dictionary = await getDictionary(lang as Locale, 'website')

  return (
    <Section className={`relative ${className}`} {...props}>
      <Container>
        <h2 className="text-h2-mobile text-yellow md:text-h2">{title ?? dictionary.CTA.title}</h2>
        <p className="text-body text-white/70">{description ?? dictionary.CTA.description}</p>
        <div className="flex w-fit items-center space-x-4 py-0.5">
          <a
            href="mailto:milovan.gudelj@gmail.com"
            target="_blank"
            rel="noreferrer"
            className="text-body md:text-sub-heading-mobile xl:text-sub-heading peer font-semibold"
          >
            milovan.gudelj@gmail.com
          </a>
          <span className="transition will-change-transform peer-hover:-translate-y-2 peer-hover:translate-x-2">
            <svg
              width="32"
              height="32"
              viewBox="0 0 49 49"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.39128 48.9185L0.724609 42.2518L30.3437 12.6327L33.7722 10.1566L33.1056 8.72798L29.0103 9.68036H12.0579V0.918457H43.9627L48.8198 5.87084V37.6804H39.9627V20.6327L40.9151 16.4423L39.4865 15.8708L37.0103 19.2994L7.39128 48.9185Z"
                fill="currentColor"
              />
            </svg>
          </span>
        </div>
      </Container>
    </Section>
  )
}
