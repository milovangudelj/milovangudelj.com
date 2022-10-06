const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		colors: {
			primary: "#FFC700",
			orange: "#F14E1C",
			green: "#0FAA58",
			blue: "#5552FE",
			lavender: "#C6B9FF",
			purple: "#A25AFF",
			salmon: "#FF8575",
			cyan: "#689BF9",
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
				h1: [
					"182.25px",
					{
						fontWeight: "700",
						letterSpacing: "-1px",
						lineHeight: "240px",
					},
				],
				"h1-mobile": [
					"121.5px",
					{
						fontWeight: "700",
						letterSpacing: "normal",
						lineHeight: "160px",
					},
				],
				h2: [
					"121.5px",
					{
						fontWeight: "700",
						letterSpacing: "normal",
						lineHeight: "160px",
					},
				],
				"h2-mobile": [
					"81px",
					{
						fontWeight: "700",
						letterSpacing: "normal",
						lineHeight: "104px",
					},
				],
				h3: [
					"81px",
					{
						fontWeight: "700",
						letterSpacing: "normal",
						lineHeight: "104px",
					},
				],
				"h3-mobile": [
					"54px",
					{
						fontWeight: "700",
						letterSpacing: "normal",
						lineHeight: "72px",
					},
				],
				h4: [
					"54px",
					{
						fontWeight: "700",
						letterSpacing: "normal",
						lineHeight: "72px",
					},
				],
				"h4-mobile": [
					"36px",
					{
						fontWeight: "700",
						letterSpacing: "normal",
						lineHeight: "48px",
					},
				],
				"sub-heading": [
					"32px",
					{
						fontWeight: "500",
						letterSpacing: "normal",
						lineHeight: "40px",
					},
				],
				"sub-heading-mobile": [
					"24px",
					{
						fontWeight: "500",
						letterSpacing: "normal",
						lineHeight: "32px",
					},
				],
				"body-lg": [
					"18px",
					{
						fontWeight: "400",
						letterSpacing: "normal",
						lineHeight: "28px",
					},
				],
				"body-md": [
					"16px",
					{
						fontWeight: "400",
						letterSpacing: "normal",
						lineHeight: "24px",
					},
				],
				"body-sm": [
					"14px",
					{
						fontWeight: "400",
						letterSpacing: "normal",
						lineHeight: "20px",
					},
				],
			},
			fontFamily: {
				space: ["'Space Grotesk'", ...defaultTheme.fontFamily.sans],
				sans: ["'Inter'", ...defaultTheme.fontFamily.sans],
			},
			dropShadow: {
				brutal: "4px 4px 0 black",
				"brutal-lg": "8px 8px 0 black",
			},
		},
	},
	plugins: [require("@tailwindcss/typography")],
};
