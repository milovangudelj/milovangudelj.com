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

type ScrollProviderValue = [
	scrollable: boolean,
	setScrollable: Dispatch<SetStateAction<boolean>>
];

const ScrollContext = createContext<ScrollProviderValue>([true, () => {}]);

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
	const router = useRouter();

	useEffect(() => {
		const changeHandler = () => setScrollable(true);

		router.events.on("routeChangeComplete", changeHandler);

		return () => {
			router.events.off("routeChangeComplete", changeHandler);
		};
	}, []);

	return [scrollable, setScrollable];
};
