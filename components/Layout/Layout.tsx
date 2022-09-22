import { ComponentPropsWithRef } from "react";

import { Navbar } from "../";

interface LayoutProps extends ComponentPropsWithRef<"div"> {}

export const Layout = ({ children, ...props }: LayoutProps) => {
	return (
		<div className="min-h-screen bg-black text-white" {...props}>
			<Navbar />
			{children}
		</div>
	);
};
