import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core brand colors — pink, purple, Indian wedding luxury
        primary: "#2D1B4E",       // Deep royal purple
        secondary: "#FEF0F8",     // Soft blush pink
        accent: "#C2185B",        // Deep rose pink — main accent
        rose: "#E91E8C",          // Vibrant hot pink — secondary accent
        blush: "#FCE4EC",         // Petal pink
        burgundy: "#880E4F",      // Deep magenta
        champagne: "#F8BBD9",     // Soft pink champagne
        ivory: "#FFF5FA",         // Pink-tinted ivory
        warmgray: "#9E7E8C",      // Mauve warm gray
      },
      fontFamily: {
        // Set via CSS variables injected from layout.tsx
        cormorant: ["var(--font-cormorant)", "Georgia", "serif"],
        jost: ["var(--font-jost)", "system-ui", "sans-serif"],
        sans: ["var(--font-jost)", "system-ui", "sans-serif"],
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
      },
      fontSize: {
        // Editorial scale
        "display-2xl": ["6rem", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-xl": ["5rem", { lineHeight: "1.08", letterSpacing: "-0.02em" }],
        "display-lg": ["4rem", { lineHeight: "1.1", letterSpacing: "-0.015em" }],
        "display-md": ["3rem", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
        "display-sm": ["2.25rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "88": "22rem",
        "128": "32rem",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        "premium": "0 25px 60px -10px rgba(45, 27, 78, 0.18)",
        "premium-lg": "0 40px 80px -12px rgba(45, 27, 78, 0.24)",
        "gold": "0 8px 30px rgba(194, 24, 91, 0.35)",
        "gold-lg": "0 15px 50px rgba(194, 24, 91, 0.5)",
        "inner-gold": "inset 0 1px 0 rgba(194, 24, 91, 0.4)",
        "glass": "0 8px 32px 0 rgba(45, 27, 78, 0.12)",
      },
      backgroundImage: {
        // Luxury gradients — pink & purple
        "gold-gradient": "linear-gradient(135deg, #C2185B 0%, #F8BBD9 50%, #C2185B 100%)",
        "rose-gradient": "linear-gradient(135deg, #E91E8C 0%, #FCE4EC 50%, #E91E8C 100%)",
        "warm-gradient": "linear-gradient(135deg, #2D1B4E 0%, #3D2465 100%)",
        "ivory-gradient": "linear-gradient(180deg, #FFF5FA 0%, #FEF0F8 100%)",
        "hero-overlay": "linear-gradient(to right, rgba(45,27,78,0.75) 0%, rgba(45,27,78,0.4) 60%, rgba(45,27,78,0.1) 100%)",
        "card-overlay": "linear-gradient(to top, rgba(45,27,78,0.9) 0%, rgba(45,27,78,0.4) 50%, transparent 100%)",
      },
      animation: {
        "fade-up": "fadeUp 0.8s ease-out forwards",
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-right": "slideRight 0.8s ease-out forwards",
        "slide-left": "slideLeft 0.8s ease-out forwards",
        "float": "float 6s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "shimmer": "shimmer 2.5s linear infinite",
        "spin-slow": "spin 8s linear infinite",
        "scale-in": "scaleIn 0.5s ease-out forwards",
        "reveal": "reveal 1s ease-out forwards",
        "parallax": "parallax linear forwards",
        "marquee": "marquee 30s linear infinite",
        "pulse-gold": "pulseGold 3s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideRight: {
          "0%": { opacity: "0", transform: "translateX(-40px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideLeft: {
          "0%": { opacity: "0", transform: "translateX(40px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-15px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        reveal: {
          "0%": { clipPath: "inset(0 100% 0 0)" },
          "100%": { clipPath: "inset(0 0% 0 0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        pulseGold: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(194, 24, 91, 0.4)" },
          "50%": { boxShadow: "0 0 0 12px rgba(194, 24, 91, 0)" },
        },
      },
      transitionTimingFunction: {
        "luxury": "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        "smooth": "cubic-bezier(0.4, 0, 0.2, 1)",
        "bounce-soft": "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      transitionDuration: {
        "400": "400ms",
        "600": "600ms",
        "800": "800ms",
        "1000": "1000ms",
        "1200": "1200ms",
      },
      backdropBlur: {
        "xs": "2px",
        "4xl": "72px",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "none",
            color: "#4A1540",
            fontFamily: "var(--font-jost), system-ui, sans-serif",
            h1: { color: "#2D1B4E", fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: "600" },
            h2: { color: "#2D1B4E", fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: "600" },
            h3: { color: "#2D1B4E", fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: "600" },
            h4: { color: "#2D1B4E", fontWeight: "600" },
            strong: { color: "#2D1B4E" },
            a: { color: "#C2185B", "&:hover": { color: "#A0154D" } },
            blockquote: { color: "#9E7E8C", borderLeftColor: "#C2185B" },
            code: {
              color: "#2D1B4E",
              backgroundColor: "#FEF0F8",
              padding: "0.25rem 0.375rem",
              borderRadius: "0.25rem",
              fontWeight: "600",
            },
            "code::before": { content: '""' },
            "code::after": { content: '""' },
            pre: { backgroundColor: "#FEF0F8", color: "#4A1540" },
            table: { borderCollapse: "collapse" },
            th: { border: "1px solid #F8BBD9", backgroundColor: "#FFF5FA", padding: "0.5rem", textAlign: "left" },
            td: { border: "1px solid #F8BBD9", padding: "0.5rem" },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
