import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export const Star = ({
	className,
	width = 20,
	height = 32,
	animation = "regular",
	delay = 0,
	...props
}: ComponentProps<"span"> & {
	width?: number;
	height?: number;
	animation?: "regular" | "inverse";
	delay?: number;
}) => {
	return (
		<span className={className} {...props}>
			<svg
				width={width}
				height={height}
				viewBox="0 0 20 32"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				className={`${
					animation === "regular" ? "animate-wiggle" : "animate-wiggle-inv"
				} text-salmon will-change-transform`}
				style={{
					animationDelay: `${delay}s`,
				}}
			>
				<path
					d="M1.99951 16.0005C5.99951 16.0005 9.99951 10 9.99951 6C9.99951 10 13.9995 16.0005 17.9995 16.0005C13.9995 16.0005 9.99951 21.9999 9.99951 26C9.99951 21.9999 5.99951 16.0005 1.99951 16.0005Z"
					fill="currentColor"
				/>
				<path
					d="M9.99951 6C9.99951 10 5.99951 16.0005 1.99951 16.0005M9.99951 6C9.99951 10 13.9995 16.0005 17.9995 16.0005M9.99951 6L10 1M1.99951 16.0005C5.99951 16.0005 9.99951 21.9999 9.99951 26M1.99951 16.0005H1M17.9995 16.0005C13.9995 16.0005 9.99951 21.9999 9.99951 26M17.9995 16.0005H19M9.99951 26L10 31"
					stroke="currentColor"
					strokeLinecap="square"
				/>
			</svg>
		</span>
	);
};
