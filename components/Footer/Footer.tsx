export const Footer = () => {
	return (
		<footer className="fixed bottom-0 w-full">
			<div className="mx-auto flex w-full max-w-[1440px] items-center justify-between p-4 text-label-md md:px-16">
				<span>Milovan Gudelj &copy; 2022</span>
				<ul className="flex space-x-2 md:space-x-4">
					<li>
						<a
							target="_blank"
							rel="noreferrer"
							href="https://dribbble.com/milovangudelj"
						>
							Dribbble
						</a>
					</li>
					<li>
						<a
							target="_blank"
							rel="noreferrer"
							href="https://twitter.com/milovangudelj"
						>
							Twitter
						</a>
					</li>
					<li>
						<a
							target="_blank"
							rel="noreferrer"
							href="https://instagram.com/milovangudelj"
						>
							Instagram
						</a>
					</li>
				</ul>
			</div>
		</footer>
	);
};
