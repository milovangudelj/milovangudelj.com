export const Footer = () => {
	return (
		<footer className="border-t border-white/[0.06] px-8">
			<div className="mx-auto flex w-full max-w-7xl items-center justify-between py-4 text-label-md text-white/70">
				<span>Milovan Gudelj &copy; 2023</span>
				<ul className="flex space-x-4">
					<li>
						<a
							target="_blank"
							rel="noreferrer"
							href="https://dribbble.com/milovangudelj"
							className="transition hover:text-white"
						>
							Dr
						</a>
					</li>
					<li>
						<a
							target="_blank"
							rel="noreferrer"
							href="https://twitter.com/milovangudelj"
							className="transition hover:text-white"
						>
							Tw
						</a>
					</li>
					<li>
						<a
							target="_blank"
							rel="noreferrer"
							href="https://instagram.com/milovangudelj"
							className="transition hover:text-white"
						>
							Ig
						</a>
					</li>
					<li>
						<a
							target="_blank"
							rel="noreferrer me"
							href="https://mastodon.social/@ilikemartians"
							className="transition hover:text-white"
						>
							Ma
						</a>
					</li>
				</ul>
			</div>
		</footer>
	);
};
