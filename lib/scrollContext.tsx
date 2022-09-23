import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useContext,
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
	return (
		<ScrollContext.Provider value={useState<boolean>(true)}>
			{children}
		</ScrollContext.Provider>
	);
};
