import {
	ComponentPropsWithoutRef,
	ComponentPropsWithRef,
	ElementType,
	forwardRef,
	HTMLAttributes,
} from "react";

export interface ButtonProps<T extends ElementType> extends HTMLAttributes<T> {
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
				className="inline-block h-min rounded-lg bg-yellow px-4 py-2 text-button text-black"
				ref={ref}
				{...props}
			>
				{children}
			</Component>
		);
	}
);

Button.displayName = "Button";
