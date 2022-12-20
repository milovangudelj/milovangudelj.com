import { cva, type VariantProps } from "cva";

const button = cva(
	"border-2 text-black inline-block transition-all will-change-[filter] hover:drop-shadow-brutal",
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
			fullWidth: {
				true: "w-full",
				fslse: "w-fit",
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

export interface ButtonProps<T extends React.ElementType>
	extends React.HTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof button> {
	as?: T;
}

export const Button = <T extends React.ElementType = "button">({
	children,
	intent,
	size,
	fullWidth,
	className,
	as,
	...props
}: ButtonProps<T> &
	Omit<React.ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>) => {
	const Component = as || "button";

	return (
		<Component
			className={button({ intent, size, fullWidth, className })}
			{...props}
		>
			{children}
		</Component>
	);
};
