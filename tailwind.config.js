const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
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
						letterSpacing: "0.025em",
						lineHeight: "1.3",
					},
				],
				"button-md": [
					"15px",
					{
						fontWeight: "700",
						letterSpacing: "0.025em",
						lineHeight: "1.3",
					},
				],
				"button-sm": [
					"12.5px",
					{
						fontWeight: "700",
						letterSpacing: "0.025em",
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
				"brutal-lg": "8px 8px 0 black",
			},
			animation: {
				wiggle: "wiggle 2.4s ease-in-out infinite",
				"wiggle-inv": "wiggle-inv 2.4s ease-in-out infinite",
				stretch: "stretch 2.4s ease-in-out infinite",
			},
			keyframes: {
				wiggle: {
					"0%, 100%": { transform: "rotate(-4deg)" },
					"50%": { transform: "rotate(4deg)" },
				},
				"wiggle-inv": {
					"0%, 100%": { transform: "rotate(4deg)" },
					"50%": { transform: "rotate(-4deg)" },
				},
				stretch: {
					"0%, 100%": { transform: "scaleY(1)" },
					"50%": { transform: "scaleY(.5)" },
				},
			},
		},
	},
	plugins: [require("@tailwindcss/typography")],
};
