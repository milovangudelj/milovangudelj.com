import { createContext, ReactNode, useContext, useState } from "react";
import { useIsomorphicLayoutEffect } from "../utils/useIsomorphicLayoutEffect";

type WindowSizeProviderValue = {
	size: {
		width: number;
		height: number;
	};
	mobile: boolean;
	tablet: boolean;
	desktopSm: boolean;
	desktop: boolean;
};

const WindowSizeContext = createContext<WindowSizeProviderValue>({
	size: { width: 1280, height: 600 },
	mobile: false,
	tablet: false,
	desktopSm: false,
	desktop: true,
});

export function useWindowSize(): WindowSizeProviderValue {
	return useContext(WindowSizeContext);
}

export const WindowSizeProvider = ({ children }: { children: ReactNode }) => {
	const value = useProvideWindowSize();

	return (
		<WindowSizeContext.Provider value={value}>
			{children}
		</WindowSizeContext.Provider>
	);
};

const useProvideWindowSize = (): WindowSizeProviderValue => {
	const [width, setWidth] = useState<number>(1280);
	const [height, setHeight] = useState<number>(600);
	const [mobile, setMobile] = useState<boolean>(false);
	const [tablet, setTablet] = useState<boolean>(false);
	const [desktopSm, setDesktopSm] = useState<boolean>(false);
	const [desktop, setDesktop] = useState<boolean>(true);

	useIsomorphicLayoutEffect(() => {
		const resized = () => {
			let w = window.innerWidth;
			let h = window.innerHeight;

			setWidth(w);
			setHeight(h);
			setMobile(w < 768);
			setTablet(w >= 768 && w < 1024);
			setDesktopSm(w >= 1024 && w < 1280);
			setDesktop(w >= 1280);
		};
		resized();

		addEventListener("resize", resized);

		return () => {
			removeEventListener("resize", resized);
		};
	}, []);

	return { size: { width, height }, mobile, tablet, desktopSm, desktop };
};
