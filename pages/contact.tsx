import { HeadMeta, Layout } from "../components";

const meta = {
	title: "Milovan Gudelj - Contact me",
	description:
		"I design and develop engaging websites and delightful digital experiences.",
	url: "https://milovangudelj.com/about",
	image: "https://milovangudelj.com/images/og-image.png",
};

const Contact = () => {
	return (
		<Layout>
			<HeadMeta metadata={meta} />
			<section className="bg-blue scroll-mt-[72px] md:scroll-mt-[88px]">
				<main className="max-w-8xl mx-auto py-16 px-8 md:py-32 md:px-16 space-y-16">
					<div className="space-y-8">
						<h1 className="text-h3-mobile md:text-h2-mobile xl:text-h2">
							Let&apos;s work together
						</h1>
						<p className="text-body-lg xl:max-w-[680px]">
							If you like what I do please feel free to contact me and
							who nkows, we might build the next big thing or just a cool
							looking website.
						</p>
					</div>
					<div className="flex space-x-4 py-0.5 items-center">
						<a
							href="mailto:milovan.gudelj@gmail.com"
							target="_blank"
							rel="noreferrer"
							className="text-body-lg md:text-sub-heading-mobile xl:text-sub-heading font-semibold"
						>
							milovan.gudelj@gmail.com
						</a>
						<span className="text-primary [filter:drop-shadow(4px_4px_0_black)]">
							<svg
								width="48"
								height="48"
								viewBox="0 0 49 49"
								fill="current-color"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M7.39128 48.9185L0.724609 42.2518L30.3437 12.6327L33.7722 10.1566L33.1056 8.72798L29.0103 9.68036H12.0579V0.918457H43.9627L48.8198 5.87084V37.6804H39.9627V20.6327L40.9151 16.4423L39.4865 15.8708L37.0103 19.2994L7.39128 48.9185Z"
									fill="#FFC700"
								/>
							</svg>
						</span>
					</div>
				</main>
			</section>
		</Layout>
	);
};

export default Contact;
