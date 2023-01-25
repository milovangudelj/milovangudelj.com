import { hexToRgb } from "./hexToRgb";

export const getLuminance = (color: string): number => {
	let tempColor: { r: number; g: number; b: number } = { r: 0, g: 0, b: 0 };

	const rgb = hexToRgb(color);

	tempColor.r = calcPartial(rgb.r);
	tempColor.g = calcPartial(rgb.g);
	tempColor.b = calcPartial(rgb.b);

	const colorLuminance =
		0.2126 * tempColor.r + 0.7152 * tempColor.g + 0.0722 * tempColor.b;

	return colorLuminance;
};

const calcPartial = (c: number) => {
	c = c / 255.0;
	if (c <= 0.04045) {
		c = c / 12.92;
	} else {
		c = ((c + 0.055) / 1.055) ** 2.4;
	}

	return c;
};

/** Minimum luminance value for black text over a given color.
 *
 * `bgLuminance > treshold ? blackText : whiteText`
 */
export const TEXT_LUMINANCE_TRESHOLD = 0.179;
