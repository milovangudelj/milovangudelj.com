const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx}",
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
			current: "currentColor",
		},
		extend: {
			screens: {
				xs: "375px",
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
				space: ["var(--font-space)", ...defaultTheme.fontFamily.sans],
				sans: ["var(--font-inter)", ...defaultTheme.fontFamily.sans],
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
				"spin-slow": "spin 2s linear infinite",
				"orbit-1": "orbit-1 60s linear infinite",
				"orbit-2": "orbit-2 60s linear infinite",
				"orbit-3": "orbit-3 60s linear infinite",
				"orbit-4": "orbit-4 60s linear infinite",
				"orbit-5": "orbit-5 60s linear infinite",
				"orbit-6": "orbit-6 60s linear infinite",
				"orbit-7": "orbit-7 60s linear infinite",
				"orbit-8": "orbit-8 60s linear infinite",
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
				"orbit-1": {
					"0%": {
						transform:
							"rotate(-0deg) translateX(var(--orbit-radius)) rotate(0deg)",
					},
					"100%": {
						transform:
							"rotate(-360deg) translateX(var(--orbit-radius)) rotate(360deg)",
					},
				},
				"orbit-2": {
					"0%": {
						transform:
							"rotate(-45deg) translateX(var(--orbit-radius)) rotate(45deg)",
					},
					"100%": {
						transform:
							"rotate(-405deg) translateX(var(--orbit-radius)) rotate(405deg)",
					},
				},
				"orbit-3": {
					"0%": {
						transform:
							"rotate(-90deg) translateX(var(--orbit-radius)) rotate(90deg)",
					},
					"100%": {
						transform:
							"rotate(-450deg) translateX(var(--orbit-radius)) rotate(450deg)",
					},
				},
				"orbit-4": {
					"0%": {
						transform:
							"rotate(-135deg) translateX(var(--orbit-radius)) rotate(135deg)",
					},
					"100%": {
						transform:
							"rotate(-495deg) translateX(var(--orbit-radius)) rotate(495deg)",
					},
				},
				"orbit-5": {
					"0%": {
						transform:
							"rotate(-180deg) translateX(var(--orbit-radius)) rotate(180deg)",
					},
					"100%": {
						transform:
							"rotate(-540deg) translateX(var(--orbit-radius)) rotate(540deg)",
					},
				},
				"orbit-6": {
					"0%": {
						transform:
							"rotate(-225deg) translateX(var(--orbit-radius)) rotate(225deg)",
					},
					"100%": {
						transform:
							"rotate(-585deg) translateX(var(--orbit-radius)) rotate(585deg)",
					},
				},
				"orbit-7": {
					"0%": {
						transform:
							"rotate(-270deg) translateX(var(--orbit-radius)) rotate(270deg)",
					},
					"100%": {
						transform:
							"rotate(-630deg) translateX(var(--orbit-radius)) rotate(630deg)",
					},
				},
				"orbit-8": {
					"0%": {
						transform:
							"rotate(-315deg) translateX(var(--orbit-radius)) rotate(315deg)",
					},
					"100%": {
						transform:
							"rotate(-675deg) translateX(var(--orbit-radius)) rotate(675deg)",
					},
				},
			},
			backgroundImage: {
				"chevron-down": "url(/images/chevron-down.svg)",
				noise: "url(/images/noise.webp)",
				"album-noise": "url(/images/album-noise.webp)",
				"fading-dashes": "url(/images/fading-dashed-line.svg)",
				"h-fading-dashes": "url(/images/fading-dashed-horizontal-line.svg)",
			},
		},
	},
	plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
