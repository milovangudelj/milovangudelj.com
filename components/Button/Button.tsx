import { cva, type VariantProps } from "cva";
import {
	ComponentPropsWithoutRef,
	ComponentPropsWithRef,
	ElementType,
	forwardRef,
	HTMLAttributes,
} from "react";

const button = cva(
	"border-2 text-black cursor-pointer text-center inline-block no-underline transition-all will-change-[filter] hover:drop-shadow-brutal",
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

export interface ButtonProps<T extends ElementType>
	extends HTMLAttributes<T>,
		VariantProps<typeof button> {
	as?: T;
}

export const Button = forwardRef(
	<T extends ElementType = "button">(
		{
			children,
			intent,
			size,
			fullWidth,
			className,
			as,
			...props
		}: ButtonProps<T> &
			Omit<ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>,
		ref: ComponentPropsWithRef<T>["ref"]
	) => {
		const Component = as || "button";

		return (
			<Component
				className={button({ intent, size, fullWidth, className })}
				ref={ref}
				{...props}
			>
				{children}
			</Component>
		);
	}
);

Button.displayName = "Button";