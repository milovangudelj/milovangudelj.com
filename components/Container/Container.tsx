import {
	ComponentPropsWithoutRef,
	ElementType,
	HTMLAttributes,
	ReactNode,
} from "react";
import { twMerge } from "tailwind-merge";

export interface ContainerProps<T extends ElementType>
	extends HTMLAttributes<T> {
	as?: T;
}

export const Container = <T extends ElementType = "div">({
	children,
	as,
	className,
	...props
}: ContainerProps<T> &
	Omit<ComponentPropsWithoutRef<T>, keyof ContainerProps<T>>) => {
	const Component = as || "div";

	return (
		<Component
			className={twMerge("mx-auto max-w-7xl space-y-16", className)}
			{...props}
		>
			{children}
		</Component>
	);
};
