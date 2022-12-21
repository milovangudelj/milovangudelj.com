import { hexToRgb } from "./hexToRgb";

export const getLuminance = (color: string): number => {
	let tempColor: number[] = [];

	hexToRgb(color).forEach((c, idx) => {
		c = c / 255.0;
		if (c <= 0.04045) {
			c = c / 12.92;
		} else {
			c = ((c + 0.055) / 1.055) ** 2.4;
		}

		tempColor[idx] = c;
	});

	const colorLuminance =
		0.2126 * tempColor[0] + 0.7152 * tempColor[1] + 0.0722 * tempColor[2];

	return colorLuminance;
};

/** Minimum luminance value for black text over a given color.
 *
 * `bgLuminance > treshold ? blackText : whiteText`
 */
export const TEXT_LUMINANCE_TRESHOLD = 0.179;
