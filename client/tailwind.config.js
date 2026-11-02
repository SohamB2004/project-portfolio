/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: "#0B0F17",
          surface: "#101623",
          card: "#131B2E",
          cardHover: "#17223B",
          border: "rgba(255, 255, 255, 0.08)",
          borderGlow: "rgba(59, 130, 246, 0.35)",
        },
        brand: {
          blue: "#3B82F6",
          blueDark: "#2563EB",
          blueLight: "#60A5FA",
          cyan: "#38BDF8",
          glow: "rgba(59, 130, 246, 0.25)"
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-sm': '0 0 15px rgba(59, 130, 246, 0.25)',
        'glow-md': '0 0 25px rgba(59, 130, 246, 0.35)',
        'glow-lg': '0 0 45px rgba(59, 130, 246, 0.2)',
        'card': '0 10px 30px -10px rgba(0, 0, 0, 0.6)',
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(37, 99, 235, 0.22), transparent 70%)',
        'subtle-grid': 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
      }
    },
  },
  plugins: [],
}

