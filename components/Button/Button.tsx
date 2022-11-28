import { cva, type VariantProps } from "cva";

const button = cva(
	"border-2 transition-all will-change-[filter] hover:drop-shadow-brutal",
	{
		variants: {
			intent: {
				primary: "bg-salmon",
				secondary: "bg-lavender",
				error: "bg-orange",
			},
			size: {
				sm: "py-1 px-2 text-button-sm",
				md: "py-1.5 px-3 text-button-md",
				lg: "py-2 px-4 text-button",
			},
		},
		compoundVariants: [
			{ intent: "primary", size: "sm", className: "uppercase" },
		],
		defaultVariants: {
			intent: "primary",
			size: "lg",
		},
	}
);

export interface ButtonProps
	extends React.HTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof button> {}

export const Button = ({
	children,
	intent,
	size,
	className,
	...props
}: ButtonProps) => {
	return (
		<button className={button({ intent, size, className })} {...props}>
			{children}
		</button>
	);
};
