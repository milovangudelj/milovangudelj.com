const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	safelist: [
		"bg-yellow",
		"bg-orange",
		"bg-green",
		"bg-lavender",
		"bg-lilla",
		"bg-purple",
		"bg-salmon",
		"bg-light-cyan",
		"bg-light-green",
		"text-yellow",
		"text-orange",
		"text-green",
		"text-lavender",
		"text-lilla",
		"text-purple",
		"text-salmon",
		"text-light-cyan",
		"text-light-green",
		"bg-spotify-brand",
		"bg-spotify-pink",
		"bg-spotify-orange",
		"bg-spotify-yellow",
		"bg-spotify-black",
		"bg-spotify-purple",
		"text-spotify-brand",
		"text-spotify-pink",
		"text-spotify-orange",
		"text-spotify-yellow",
		"text-spotify-black",
		"text-spotify-purple",
	],
	theme: {
		colors: {
			yellow: "#FFC700",
			orange: "#F14E1C",
			green: "#0FAA58",
			lavender: "#5552FE",
			lilla: "#C6B9FF",
			purple: "#A25AFF",
			salmon: "#FF8575",
			"light-cyan": "#689BF9",
			"light-green": "#B1EBD3",
			dark: {
				he: "rgba(0, 0, 0, .87)",
				me: "rgba(0, 0, 0, .60)",
				le: "rgba(0, 0, 0, .38)",
			},
			light: {
				he: "rgba(255, 255, 255, 1)",
				me: "rgba(255, 255, 255, .74)",
				le: "rgba(255, 255, 255, .38)",
			},
			instagram: "#E4405F",
			dribbble: "#EA4C89",
			twitter: "#1DA1F2",
			spotify: {
				brand: "#1ED760",
				pink: "#F774C4",
				orange: "#FF8A1E",
				yellow: "#F2FF48",
				black: "#121212",
				purple: "#6A00BA",
			},
			black: "#000000",
			white: "#ffffff",
			transparent: "transparent",
		},
		extend: {
			screens: {
				"2xl": "1440px",
				"3xl": defaultTheme.screens["2xl"],
			},
			maxWidth: {
				"8xl": "1440px",
			},
			fontSize: {
				d1: [
					"99.08px",
					{
						fontWeight: "700",
						letterSpacing: "-1px",
						lineHeight: "1.3",
					},
				],
				"d1-mobile": [
					"82.57px",
					{
						fontWeight: "700",
						letterSpacing: "normal",
						lineHeight: "1.3",
					},
				],
				d2: [
					"82.57px",
					{
						fontWeight: "700",
						letterSpacing: "normal",
						lineHeight: "1.3",
					},
				],
				"d2-mobile": [
					"68.81px",
					{
						fontWeight: "700",
						letterSpacing: "normal",
						lineHeight: "1.3",
					},
				],
				h1: [
					"68.81px",
					{
						fontWeight: "700",
						letterSpacing: "normal",
						lineHeight: "1.3",
					},
				],
				"h1-mobile": [
					"57.34px",
					{
						fontWeight: "700",
						letterSpacing: "normal",
						lineHeight: "1.3",
					},
				],
				h2: [
					"57.34px",
					{
						fontWeight: "700",
						letterSpacing: "normal",
						lineHeight: "1.3",
					},
				],
				"h2-mobile": [
					"47.78px",
					{
						fontWeight: "700",
						letterSpacing: "normal",
						lineHeight: "1.3",
					},
				],
				h3: [
					"47.78px",
					{
						fontWeight: "700",
						letterSpacing: "normal",
						lineHeight: "1.3",
					},
				],
				"h3-mobile": [
					"39.82px",
					{
						fontWeight: "700",
						letterSpacing: "normal",
						lineHeight: "1.3",
					},
				],
				h4: [
					"39.82px",
					{
						fontWeight: "700",
						letterSpacing: "normal",
						lineHeight: "1.3",
					},
				],
				"h4-mobile": [
					"33.18px",
					{
						fontWeight: "700",
						letterSpacing: "normal",
						lineHeight: "1.3",
					},
				],
				h5: [
					"33.18px",
					{
						fontWeight: "700",
						letterSpacing: "normal",
						lineHeight: "1.3",
					},
				],
				"h5-mobile": [
					"27.65px",
					{
						fontWeight: "700",
						letterSpacing: "normal",
						lineHeight: "1.3",
					},
				],
				h6: [
					"27.65px",
					{
						fontWeight: "700",
						letterSpacing: "normal",
						lineHeight: "1.3",
					},
				],
				"h6-mobile": [
					"23.04px",
					{
						fontWeight: "700",
						letterSpacing: "normal",
						lineHeight: "1.3",
					},
				],
				"sub-heading": [
					"23.04px",
					{
						fontWeight: "500",
						letterSpacing: "normal",
						lineHeight: "1.5",
					},
				],
				"sub-heading-mobile": [
					"19.2px",
					{
						fontWeight: "500",
						letterSpacing: "normal",
						lineHeight: "1.5",
					},
				],
				body: [
					"18px",
					{
						fontWeight: "400",
						letterSpacing: "normal",
						lineHeight: "1.75",
					},
				],
				button: [
					"18px",
					{
						fontWeight: "700",
						lineHeight: "1.3",
					},
				],
				"button-md": [
					"15px",
					{
						fontWeight: "700",
						lineHeight: "1.3",
					},
				],
				"button-sm": [
					"12.5px",
					{
						fontWeight: "700",
						lineHeight: "1.3",
					},
				],
				"label-md": [
					"15px",
					{
						fontWeight: "400",
						letterSpacing: "normal",
						lineHeight: "1.75",
					},
				],
				"label-sm": [
					"12.5px",
					{
						fontWeight: "400",
						letterSpacing: "normal",
						lineHeight: "1.75",
					},
				],
			},
			fontFamily: {
				space: ["'Space Grotesk'", ...defaultTheme.fontFamily.sans],
				sans: ["'Inter'", ...defaultTheme.fontFamily.sans],
			},
			dropShadow: {
				behind: "0 0 0 black",
				brutal: "4px 4px 0 black",
				"brutal-poster": "6.27px 6.27px 0 black",
				"brutal-lg": "8px 8px 0 black",
			},
			animation: {
				wiggle: "wiggle 500ms ease-in-out",
				"wiggle-inv": "wiggle-inv 500ms ease-in-out",
				stretch: "stretch 2.4s ease-in-out infinite",
			},
			keyframes: {
				wiggle: {
					"0%, 100%": { transform: "rotate(-4deg)" },
					"25%": { transform: "rotate(4deg)" },
					"50%": { transform: "rotate(-4deg)" },
					"75%": { transform: "rotate(4deg)" },
				},
				"wiggle-inv": {
					"0%, 100%": { transform: "rotate(4deg)" },
					"25%": { transform: "rotate(-4deg)" },
					"50%": { transform: "rotate(4deg)" },
					"75%": { transform: "rotate(-4deg)" },
				},
				stretch: {
					"0%, 100%": { transform: "scaleY(1)" },
					"50%": { transform: "scaleY(.5)" },
				},
			},
			backgroundImage: {
				"chevron-down": "url(/images/chevron-down.svg)",
			},
		},
	},
	plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
