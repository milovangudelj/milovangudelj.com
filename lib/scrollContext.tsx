import { useRouter } from "next/router";
import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useContext,
	useEffect,
	useState,
} from "react";

type ScrollProviderValue = {
	scrollable: boolean;
	scrollY: number;
	setScrollable: Dispatch<SetStateAction<boolean>>;
};

const ScrollContext = createContext<ScrollProviderValue>({
	scrollable: true,
	scrollY: 0,
	setScrollable: () => {},
});

export function useScroll(): ScrollProviderValue {
	return useContext(ScrollContext);
}

export const ScrollProvider = ({ children }: { children: ReactNode }) => {
	const value = useProvideScroll();

	return (
		<ScrollContext.Provider value={value}>{children}</ScrollContext.Provider>
	);
};

const useProvideScroll = (): ScrollProviderValue => {
	const [scrollable, setScrollable] = useState<boolean>(true);
	const [scrollY, setScrollY] = useState<number>(0);
	const router = useRouter();

	useEffect(() => {
		const changeHandler = () => setScrollable(true);
		const scrollHandler = () => setScrollY(window.scrollY);

		router.events.on("routeChangeComplete", changeHandler);
		window.addEventListener("scroll", scrollHandler);

		return () => {
			router.events.off("routeChangeComplete", changeHandler);
			window.removeEventListener("scroll", scrollHandler);
		};
	}, []);

	return {
		scrollable,
		scrollY,
		setScrollable,
	};
};
