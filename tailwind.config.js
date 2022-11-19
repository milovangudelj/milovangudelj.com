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
					"111.44px",
					{
						fontWeight: "700",
						letterSpacing: "-1px",
						lineHeight: "1.3",
					},
				],
				"d1-mobile": [
					"92.87px",
					{
						fontWeight: "700",
						letterSpacing: "normal",
						lineHeight: "1.3",
					},
				],
				d2: [
					"92.87px",
					{
						fontWeight: "700",
						letterSpacing: "normal",
						lineHeight: "1.3",
					},
				],
				"d2-mobile": [
					"77.39px",
					{
						fontWeight: "700",
						letterSpacing: "normal",
						lineHeight: "1.3",
					},
				],
				h1: [
					"77.39px",
					{
						fontWeight: "700",
						letterSpacing: "normal",
						lineHeight: "1.3",
					},
				],
				"h1-mobile": [
					"64.49px",
					{
						fontWeight: "700",
						letterSpacing: "normal",
						lineHeight: "1.3",
					},
				],
				h2: [
					"64.49px",
					{
						fontWeight: "700",
						letterSpacing: "normal",
						lineHeight: "1.3",
					},
				],
				"h2-mobile": [
					"53.74px",
					{
						fontWeight: "700",
						letterSpacing: "normal",
						lineHeight: "1.3",
					},
				],
				h3: [
					"53.74px",
					{
						fontWeight: "700",
						letterSpacing: "normal",
						lineHeight: "1.3",
					},
				],
				"h3-mobile": [
					"44.78px",
					{
						fontWeight: "700",
						letterSpacing: "normal",
						lineHeight: "1.3",
					},
				],
				h4: [
					"44.78px",
					{
						fontWeight: "700",
						letterSpacing: "normal",
						lineHeight: "1.3",
					},
				],
				"h4-mobile": [
					"37.32px",
					{
						fontWeight: "700",
						letterSpacing: "normal",
						lineHeight: "1.3",
					},
				],
				h5: [
					"37.32px",
					{
						fontWeight: "700",
						letterSpacing: "normal",
						lineHeight: "1.3",
					},
				],
				"h5-mobile": [
					"31.1px",
					{
						fontWeight: "700",
						letterSpacing: "normal",
						lineHeight: "1.3",
					},
				],
				h6: [
					"31.1px",
					{
						fontWeight: "700",
						letterSpacing: "normal",
						lineHeight: "1.3",
					},
				],
				"h6-mobile": [
					"25.92px",
					{
						fontWeight: "700",
						letterSpacing: "normal",
						lineHeight: "1.3",
					},
				],
				"sub-heading": [
					"25.92px",
					{
						fontWeight: "500",
						letterSpacing: "normal",
						lineHeight: "1.3",
					},
				],
				"sub-heading-mobile": [
					"21.6px",
					{
						fontWeight: "500",
						letterSpacing: "normal",
						lineHeight: "1.3",
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
				brutal: "4px 4px 0 black",
				"brutal-lg": "8px 8px 0 black",
			},
		},
	},
	plugins: [require("@tailwindcss/typography")],
};
