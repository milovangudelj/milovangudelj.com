import Image from 'next/image'

import figma from '~images/logos/logo_figma.svg'
import illustrator from '~images/logos/logo_illustrator.svg'
import lightroom from '~images/logos/logo_lightroom.svg'
import photoshop from '~images/logos/logo_photoshop.svg'

import nextjs from '~images/logos/logo_nextjs.svg'
import vercel from '~images/logos/logo_vercel.svg'
import tailwindcss from '~images/logos/logo_tailwindcss.svg'
import webflow from '~images/logos/logo_webflow.svg'

export const SoftwarePlanets = () => {
  return (
    <div className="max-xl:items-top absolute -right-8 bottom-0 overflow-hidden p-8 max-xl:-left-8 max-xl:h-[182px] xl:-bottom-[128px] xl:-top-[128px] xl:right-px xl:flex xl:w-[332px] xl:flex-col xl:justify-center">
      <span
        aria-hidden
        className="absolute bottom-0 left-8 top-0 z-[5] inline-block w-8 backdrop-blur-sm xl:hidden"
      ></span>
      <span
        aria-hidden
        className="absolute bottom-0 right-8 top-0 z-[5] inline-block w-8 backdrop-blur-sm xl:hidden"
      ></span>
      <div className="h-[600px] w-[600px] rounded-full bg-gradient-to-b from-white/40 to-[150px] p-px max-xl:absolute max-xl:-left-[calc(300px-50%)] max-xl:top-8 xl:bg-gradient-to-r xl:to-50%">
        <div className="bg-noise relative flex h-full w-full items-center justify-center rounded-full bg-black bg-repeat [background-size:100px]">
          <span className="animate-orbit-1 bg-noise absolute z-[1] inline-flex aspect-square w-16 items-center justify-center rounded-full bg-black bg-repeat [background-size:100px]">
            <Image
              src={figma}
              alt="Figma's logo"
              width={48}
              height={48}
              className="h-12 w-12 object-contain"
            />
          </span>
          <span className="animate-orbit-2 bg-noise absolute z-[1] inline-flex aspect-square w-16 items-center justify-center rounded-full bg-black bg-repeat [background-size:100px]">
            <Image
              src={nextjs}
              title="Next.js"
              alt="Next.js' logo"
              width={48}
              height={48}
              className="h-12 w-12 object-contain"
            />
          </span>
          <span className="animate-orbit-3 bg-noise absolute z-[1] inline-flex aspect-square w-16 items-center justify-center rounded-full bg-black bg-repeat [background-size:100px]">
            <Image
              src={photoshop}
              title="Photoshop"
              alt="Photoshop's logo"
              width={48}
              height={48}
              className="h-12 w-12 object-contain"
            />
          </span>
          <span className="animate-orbit-4 bg-noise absolute z-[1] inline-flex aspect-square w-16 items-center justify-center rounded-full bg-black bg-repeat [background-size:100px]">
            <Image
              src={vercel}
              title="Vercel"
              alt="Vercel's logo"
              width={32}
              height={32}
              className="h-10 w-10 object-contain"
            />
          </span>
          <span className="animate-orbit-5 bg-noise absolute z-[1] inline-flex aspect-square w-16 items-center justify-center rounded-full bg-black bg-repeat [background-size:100px]">
            <Image
              src={illustrator}
              title="Illustrator"
              alt="Illustrator's logo"
              width={48}
              height={48}
              className="h-12 w-12 object-contain"
            />
          </span>
          <span className="animate-orbit-6 bg-noise absolute z-[1] inline-flex aspect-square w-16 items-center justify-center rounded-full bg-black bg-repeat [background-size:100px]">
            <Image
              src={tailwindcss}
              title="TailwindCSS"
              alt="TailwindCSS' logo"
              width={48}
              height={48}
              className="h-12 w-12 object-contain"
            />
          </span>
          <span className="animate-orbit-7 bg-noise absolute z-[1] inline-flex aspect-square w-16 items-center justify-center rounded-full bg-black bg-repeat [background-size:100px]">
            <Image
              src={lightroom}
              title="Lightroom"
              alt="Lightroom's logo"
              width={48}
              height={48}
              className="h-12 w-12 object-contain"
            />
          </span>
          <span className="animate-orbit-8 bg-noise absolute z-[1] inline-flex aspect-square w-16 items-center justify-center rounded-full bg-black bg-repeat [background-size:100px]">
            <Image
              src={webflow}
              title="Webflow"
              alt="Webflow's logo"
              width={48}
              height={48}
              className="h-12 w-12 object-contain"
            />
          </span>
        </div>
      </div>
    </div>
  )
}
