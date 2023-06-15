"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

export const NavLink = ({
	id,
	href,
	label,
	onClick,
}: {
	id: string;
	href: string | URL;
	label: string;
	onClick?: () => void;
}) => {
	const segment = useSelectedLayoutSegment();

	return (
		<Link
			href={href}
			className={`relative inline-block px-4 py-2 text-button ${
				id === segment ? "opacity-100" : "opacity-60"
			} transition hover:opacity-100`}
			onClick={onClick}
		>
			{id === segment && (
				<span className="absolute bottom-0 left-0 top-0 -ml-1 mt-1 flex items-center text-yellow motion-safe:animate-spin-slow md:-ml-0.5">
					<svg
						className="aspect-square w-2.5 md:w-3"
						viewBox="0 0 13 12"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M6.22514 11.63H6.85514C6.96014 10.985 7.24514 10.28 7.72514 9.51499C8.68514 7.99999 10.6201 6.51499 12.2851 6.16999V5.53999C11.4601 5.35999 10.6501 4.98499 9.87014 4.42999C8.28014 3.30499 7.11014 1.62499 6.85514 0.109985H6.22514C6.07514 0.904985 5.73014 1.66998 5.19014 2.44998C4.12514 3.99499 2.46014 5.13499 0.765137 5.53999V6.16999C1.62014 6.34999 2.49014 6.76999 3.34514 7.41499C5.08514 8.71999 6.00014 10.34 6.22514 11.63Z"
							fill="currentColor"
						/>
					</svg>
				</span>
			)}
			{label}
		</Link>
	);
};
