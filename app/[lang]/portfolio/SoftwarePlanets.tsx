import Image from 'next/image';

import figma from "~images/logos/logo_figma.svg";
import illustrator from "~images/logos/logo_illustrator.svg";
import lightroom from "~images/logos/logo_lightroom.svg";
import photoshop from "~images/logos/logo_photoshop.svg";

import nextjs from "~images/logos/logo_nextjs.svg";
import vercel from "~images/logos/logo_vercel.svg";
import tailwindcss from "~images/logos/logo_tailwindcss.svg";
import webflow from "~images/logos/logo_webflow.svg";

export const SoftwarePlanets = () => {
	return <div className="absolute bottom-0 xl:-bottom-[128px] xl:-top-[128px] -right-8 xl:right-px max-xl:-left-8 xl:flex xl:w-[332px] max-xl:h-[182px] xl:flex-col xl:justify-center max-xl:items-top overflow-hidden p-8">
	<span aria-hidden className="absolute z-[5] top-0 bottom-0 w-8 left-8 xl:hidden backdrop-blur-sm inline-block"></span>
	<span aria-hidden className="absolute z-[5] top-0 bottom-0 w-8 right-8 xl:hidden backdrop-blur-sm inline-block"></span>
	<div className="max-xl:absolute max-xl:top-8 max-xl:-left-[calc(300px-50%)] h-[600px] w-[600px] rounded-full bg-gradient-to-b xl:bg-gradient-to-r from-white/40 xl:to-50% to-[150px] p-px">
		<div className="h-full w-full rounded-full bg-black flex items-center justify-center bg-noise relative bg-repeat [background-size:100px]">
			<span className="absolute z-[1] aspect-square w-16 animate-orbit-1 rounded-full bg-noise bg-repeat bg-black [background-size:100px] inline-flex items-center justify-center">
				<Image src={figma} alt="Figma's logo" width={48} height={48} className="object-contain w-12 h-12"/>
			</span>
			<span className="absolute z-[1] aspect-square w-16 animate-orbit-2 rounded-full bg-noise bg-repeat bg-black [background-size:100px] inline-flex items-center justify-center">
				<Image src={nextjs} title="Next.js" alt="Next.js' logo" width={48} height={48} className="object-contain w-12 h-12"/>
			</span>
			<span className="absolute z-[1] aspect-square w-16 animate-orbit-3 rounded-full bg-noise bg-repeat bg-black [background-size:100px] inline-flex items-center justify-center">
				<Image src={photoshop} title="Photoshop" alt="Photoshop's logo" width={48} height={48} className="object-contain w-12 h-12"/>
			</span>
			<span className="absolute z-[1] aspect-square w-16 animate-orbit-4 rounded-full bg-noise bg-repeat bg-black [background-size:100px] inline-flex items-center justify-center">
				<Image src={vercel} title="Vercel" alt="Vercel's logo" width={32} height={32} className="object-contain w-10 h-10"/>
			</span>
			<span className="absolute z-[1] aspect-square w-16 animate-orbit-5 rounded-full bg-noise bg-repeat bg-black [background-size:100px] inline-flex items-center justify-center">
				<Image src={illustrator} title="Illustrator" alt="Illustrator's logo" width={48} height={48} className="object-contain w-12 h-12"/>
			</span>
			<span className="absolute z-[1] aspect-square w-16 animate-orbit-6 rounded-full bg-noise bg-repeat bg-black [background-size:100px] inline-flex items-center justify-center">
				<Image src={tailwindcss} title="TailwindCSS" alt="TailwindCSS' logo" width={48} height={48} className="object-contain w-12 h-12"/>
			</span>
			<span className="absolute z-[1] aspect-square w-16 animate-orbit-7 rounded-full bg-noise bg-repeat bg-black [background-size:100px] inline-flex items-center justify-center">
				<Image src={lightroom} title="Lightroom" alt="Lightroom's logo" width={48} height={48} className="object-contain w-12 h-12"/>
			</span>
			<span className="absolute z-[1] aspect-square w-16 animate-orbit-8 rounded-full bg-noise bg-repeat bg-black [background-size:100px] inline-flex items-center justify-center">
				<Image src={webflow} title="Webflow" alt="Webflow's logo" width={48} height={48} className="object-contain w-12 h-12"/>
			</span>
		</div>
	</div>
</div>
}