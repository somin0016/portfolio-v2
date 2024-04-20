import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	darkMode: 'class',
  theme: {
    extend: {
			fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        smPrimary: {
          DEFAULT: "#183367",
          strong: "#0e1f3e",
          light: "#224790",
        },
        smSecondary: {
          DEFAULT: "#97b2e7",
        },
        smWhite: {
          DEFAULT: "#FBFBFB",
        },
        smBorder: {
          DEFAULT: "#dddee2",
        },
        smText: {
          DEFAULT: "#232529",
          light: "#5e646e",
        },
        smBackground: {
          // DEFAULT: '#efeff1',
          DEFAULT: "#F5F5F5",
        },
        smBlue: {
          DEFAULT: "#0D99FF",
          strong: "#0A7ACC",
        },
        smYellow: {
          DEFAULT: "#FFCD29",
          strong: "#CCA421",
        },
        smRed: {
          DEFAULT: "#F24822",
          strong: "#C23A1B",
        },
        smGreen: {
          DEFAULT: "#14AE5C",
          strong: "#108B4A",
        },
      },
    },
  },
  plugins: [
		require('@tailwindcss/typography'),
	],
};
