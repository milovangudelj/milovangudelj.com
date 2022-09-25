export const Footer = () => {
	return (
		<footer>
			<div className="max-w-[1440px] text-body-sm p-4 md:px-16 w-full mx-auto flex justify-between items-center">
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
