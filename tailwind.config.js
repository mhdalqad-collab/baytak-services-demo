/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "rgb(var(--color-ink) / <alpha-value>)",
        lagoon: "rgb(var(--color-primary) / <alpha-value>)",
        palm: "rgb(var(--color-soft) / <alpha-value>)",
        sand: "rgb(var(--color-shell) / <alpha-value>)",
        clay: "rgb(var(--color-accent) / <alpha-value>)",
        date: "rgb(var(--color-accent-deep) / <alpha-value>)",
        mist: "rgb(var(--color-mist) / <alpha-value>)"
      },
      fontFamily: {
        display: ["Fraunces", "Georgia", "serif"],
        sans: ["Manrope", "Segoe UI", "sans-serif"]
      },
      boxShadow: {
        soft: "0 24px 70px rgba(15, 23, 42, 0.13)",
        card: "0 18px 45px rgba(37, 99, 235, 0.12)"
      },
      animation: {
        float: "float 7s ease-in-out infinite",
        rise: "rise 0.65s ease-out both",
        pulseSoft: "pulseSoft 1.8s ease-in-out infinite"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" }
        },
        rise: {
          "0%": { opacity: 0, transform: "translateY(18px)" },
          "100%": { opacity: 1, transform: "translateY(0)" }
        },
        pulseSoft: {
          "0%, 100%": { opacity: 0.55, transform: "scale(1)" },
          "50%": { opacity: 1, transform: "scale(1.04)" }
        }
      }
    }
  },
  plugins: []
};
