import { Color, colors, getColorName, shuffleAll } from "./getColors";

export interface ColorCombo {
	bg: Color;
	fg: Color;
	black: Color;
	white: Color;
}

export const combos: ColorCombo[] = [
	{
		bg: "purple",
		fg: "yellow",
		black: "black",
		white: "white",
	},
	{
		bg: "light-cyan",
		fg: "yellow",
		black: "black",
		white: "white",
	},
	{
		bg: "yellow",
		fg: "sp-purple",
		black: "black",
		white: "white",
	},
	{
		bg: "orange",
		fg: "light-green",
		black: "black",
		white: "white",
	},
	{
		bg: "green",
		fg: "yellow",
		black: "black",
		white: "white",
	},
	{
		bg: "lavender",
		fg: "yellow",
		black: "black",
		white: "white",
	},
	{
		bg: "lilla",
		fg: "sp-purple",
		black: "black",
		white: "white",
	},
	{
		bg: "salmon",
		fg: "sp-purple",
		black: "black",
		white: "white",
	},
	{
		bg: "light-green",
		fg: "green",
		black: "black",
		white: "white",
	},
	{
		bg: "sp-pink",
		fg: "sp-purple",
		black: "black",
		white: "white",
	},
	{
		bg: "sp-orange",
		fg: "sp-purple",
		black: "black",
		white: "white",
	},
	{
		bg: "sp-yellow",
		fg: "sp-purple",
		black: "black",
		white: "white",
	},
	{
		bg: "sp-black",
		fg: "green",
		black: "lilla",
		white: "black",
	},
	{
		bg: "sp-purple",
		fg: "yellow",
		black: "black",
		white: "white",
	},
];

export type Palette = {
	bg: string;
	fg: string;
	black: string;
	white: string;
	artists: string[];
	tracks: string[];
};

export const getPalette = (color?: Color, exclude: Color[] = []): Palette => {
	const combo =
		combos.find((c) => c.bg === color) ||
		combos[Math.floor(Math.random() * combos.length)];

	const artists = shuffleAll([
		...exclude,
		combo.bg,
		combo.fg,
		"black",
		"white",
		"sp-brand",
	]);
	const tracks = shuffleAll([
		...exclude,
		combo.bg,
		combo.fg,
		"black",
		"white",
		"sp-brand",
		getColorName(artists[0]),
	]);

	const palette = {
		bg: colors[combo.bg],
		fg: colors[combo.fg],
		black: colors[combo.black],
		white: colors[combo.white],
		artists,
		tracks,
	};

	return palette;
};
