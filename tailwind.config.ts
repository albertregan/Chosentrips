import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "on-secondary-container": "#745c00",
        "on-secondary": "#ffffff",
        "on-error": "#ffffff",
        "tertiary-container": "#1f1f1c",
        "primary-fixed": "#d4e3ff",
        "surface-container-lowest": "#ffffff",
        "surface-variant": "#e4e2e2",
        "outline-variant": "#c4c6cf",
        "surface-container": "#efeded",
        "on-primary-fixed-variant": "#2f486a",
        "on-secondary-fixed": "#241a00",
        "background": "#fbf9f8",
        "primary-fixed-dim": "#afc8f0",
        "on-primary": "#ffffff",
        "surface": "#fbf9f8",
        "primary-container": "#001f3f",
        "on-primary-fixed": "#001c3a",
        "on-tertiary-container": "#888682",
        "surface-container-high": "#eae8e7",
        "secondary": "#735c00",
        "surface-tint": "#476083",
        "on-secondary-fixed-variant": "#574500",
        "surface-bright": "#fbf9f8",
        "secondary-container": "#fed65b",
        "surface-dim": "#dbd9d9",
        "error-container": "#ffdad6",
        "secondary-fixed-dim": "#e9c349",
        "inverse-on-surface": "#f2f0f0",
        "primary": "#000613",
        "on-surface-variant": "#43474e",
        "on-tertiary-fixed": "#1c1c18",
        "outline": "#74777f",
        "surface-container-highest": "#e4e2e2",
        "on-error-container": "#93000a",
        "on-tertiary": "#ffffff",
        "inverse-primary": "#afc8f0",
        "secondary-fixed": "#ffe088",
        "tertiary-fixed": "#e5e2dc",
        "tertiary-fixed-dim": "#c9c6c1",
        "error": "#ba1a1a",
        "tertiary": "#060604",
        "on-tertiary-fixed-variant": "#474743",
        "surface-container-low": "#f5f3f3",
        "on-background": "#1b1c1c",
        "inverse-surface": "#303030",
        "on-primary-container": "#6f88ad",
        "on-surface": "#1b1c1c"
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
      spacing: {
        "gutter": "24px",
        "margin-mobile": "20px",
        "unit": "8px",
        "margin-desktop": "64px",
        "container-max": "1280px"
      },
      fontFamily: {
        "headline-lg-mobile": ["Plus Jakarta Sans"],
        "label-sm": ["Manrope"],
        "body-md": ["Manrope"],
        "display-xl": ["Plus Jakarta Sans"],
        "headline-md": ["Plus Jakarta Sans"],
        "body-lg": ["Manrope"],
        "headline-lg": ["Plus Jakarta Sans"]
      },
      fontSize: {
        "headline-lg-mobile": ["32px", {"lineHeight": "40px", "fontWeight": "700"}],
        "label-sm": ["12px", {"lineHeight": "16px", "letterSpacing": "0.05em", "fontWeight": "600"}],
        "body-md": ["16px", {"lineHeight": "24px", "fontWeight": "400"}],
        "display-xl": ["60px", {"lineHeight": "72px", "letterSpacing": "-0.02em", "fontWeight": "700"}],
        "headline-md": ["24px", {"lineHeight": "32px", "fontWeight": "600"}],
        "body-lg": ["18px", {"lineHeight": "28px", "fontWeight": "400"}],
        "headline-lg": ["40px", {"lineHeight": "48px", "fontWeight": "700"}]
      }
    },
  },
  plugins: [],
};
export default config;
