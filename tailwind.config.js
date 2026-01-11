/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#0F172A", // Deep Navy (User Requested)
                foreground: "#f8fafc", // White/Slate-50
                surface: "#1E293B", // Slate-800 for Cards
                primary: {
                    DEFAULT: "#3B82F6", // Professional Blue (brighter for dark mode)
                    foreground: "#ffffff",
                },
                secondary: {
                    DEFAULT: "#334155",
                    foreground: "#94a3b8",
                },
                muted: {
                    DEFAULT: "#1e293b",
                    foreground: "#94a3b8",
                },
                accent: {
                    DEFAULT: "#3B82F6",
                    foreground: "#ffffff",
                },
                card: {
                    DEFAULT: "#1E293B", // Surface
                    foreground: "#f8fafc",
                },
                input: "#334155",
                border: "#334155",
            },
            fontFamily: {
                sans: ["var(--font-inter)", "sans-serif"],
            },
            backgroundImage: {
                'glass': 'linear-gradient(145deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
            }
        },
    },
    plugins: [],
}
