module.exports = {
	content: ["./pages/**/*.tsx", "./components/**/*.tsx", "./components/**/**/*.tsx"],
	theme: {
		fontSize: {
			header1: `48px;`,
			header2: `25px;`,
			header3: `18px;`,
			text4xl: `40px;`,
			text3xl: `36px;`,
			text2xl: `32px;`,
			textxl: `28px;`,
			textLarge: `24px;`,
			textMedium3: `20px;`,
			textMedium2: `16px;`,
			textMedium: `14px;`,
			textSmall: `12px;`,
			textXs: `10px;`,
		},
		extend: {
			backgroundImage: {
				nft: "url('https://img.freepik.com/premium-photo/chibi-art-angry-kraken-3d-glowing-light-nft-style-octopus-dark_812892-1583.jpg')",
				event: "url(https://emerging-europe.com/wp-content/uploads/2021/01/ss-b3685fcab4d6f60c9fd54ffe8757ccaaef803d9e1920x1080.jpg)",
			},
			colors: {
				card: {
					border: {
						parent: "#C8C8C8",
						child: "#AFAFAF",
					},
					header: `#FFFFFF`,
					header2: "#BABABA",
					text: "#757575",
					pill: "#AFAFAF",
					graybody: "rgba(255, 255, 255, 0.05)",
				},
				pallete2: {
					50: "#2D2D2D",
				},
				blackRgba: "rgba(0, 0, 0, 0.54)",
				form: {
					bg: "#111111",
					border: "#212121",
					child: {
						placeholder: "#838383",
						text: "#ffffff",
						bg: "#1d1d1d",
						border: "#212121",
					},
				},
			},
			keyframes: {
				wiggle_bounce: {
					"0%, 100%": { transform: "rotate(-2deg) translateY(-15%) translateX(10%)" },
					"50%": { transform: "rotate(2deg) translateY(15%) translateX(0%)" },
				},
				wiggle: {
					"0%, 100%": { transform: "rotate(-10deg)" },
					"50%": { transform: "rotate(10deg)" },
				},
			},
			animation: {
				wiggle: "wiggle 1s ease-in-out infinite",
				wiggle_bounce: "wiggle_bounce 1s ease-in-out infinite ",
			},
			fontFamily: {
				courseFont: ["poppins", "serif"],
				Anek: ["Anek Latin", "sans-serif"],
				poppins: ["Poppins", "sans-serif"],
				Inter: ["Inter", "sans-serif"],
				Nosifer: ["Nosifer", "sans-serif"],
				gruppo: ["Gruppo", "sans-serif"],
				worksans: ["Work Sans", "sans-serif"],
			},
			borderColor: {
				pallete1: {
					DEFAULT: "#c8c8c87b", // You can set the default color
				},
				pallete2: {
					DEFAULT: "#c8c8c842", // You can set the default color
				},
			},
			horizontalLineColor: {
				pallete1: {
					DEFAULT: "#5B5B5B",
				},
			},
			screens: {
				bgxl: "2040px",
				"2xl": "1420px",
				"3xl": "1780px",
			},
		},
		plugins: [require("@tailwindcss/line-clamp")],
	},
};
