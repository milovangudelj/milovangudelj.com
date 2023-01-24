import { shuffle } from "./shuffle";

export const spotifyColors = {
	"sp-brand": "#1ED760",
	"sp-pink": "#F774C4",
	"sp-orange": "#FF8A1E",
	"sp-yellow": "#F2FF48",
	"sp-black": "#121212",
	"sp-purple": "#6A00BA",
} as const;
export type SpotifyColors = typeof spotifyColors;

export const myColors = {
	yellow: "#FFC700",
	orange: "#F14E1C",
	green: "#0FAA58",
	lavender: "#5552FE",
	lilla: "#C6B9FF",
	purple: "#A25AFF",
	salmon: "#FF8575",
	"light-cyan": "#689BF9",
	"light-green": "#B1EBD3",
	black: "#000000",
	white: "#FFFFFF",
} as const;
export type MyColors = typeof myColors;

export type Color = keyof MyColors | keyof SpotifyColors;

export const shuffleAll = (exclude?: Color[]): string[] => {
	let result: string[] = shuffle(colors);

	result = result.filter((color) => {
		let present = false;

		exclude?.forEach((item) => {
			if (color.localeCompare(colors[item]) === 0) {
				present = true;
			}
		});

		return !present;
	});

	return result;
};

export const colors: { [K in Color]: string } = {
	...spotifyColors,
	...myColors,
};
