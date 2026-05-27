import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter var"', "Inter", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        /* semantic, theme-aware tokens (backed by CSS vars in global.css) */
        bg: "var(--color-bg)",
        surface: "var(--color-surface)",
        fg: "var(--color-fg)",
        muted: "var(--color-muted)",
        border: "var(--color-border)",
        accent: {
          DEFAULT: "var(--color-accent)",
          hover: "var(--color-accent-hover)",
        },

        /* point at the new semantic tokens so existing
           components automatically pick up the refreshed palette */
        smBackground: { DEFAULT: "var(--color-bg)" },
        smWhite: { DEFAULT: "var(--color-surface)" },
        smText: {
          DEFAULT: "var(--color-fg)",
          light: "var(--color-muted)",
        },
        smBorder: { DEFAULT: "var(--color-border)" },

        /* accent / Figma-style markers, used for section circles */
        smPrimary: {
          DEFAULT: "#183367",
          strong: "#0e1f3e",
          light: "#224790",
        },
        smSecondary: {
          DEFAULT: "#97b2e7",
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
  plugins: [require("@tailwindcss/typography")],
};
