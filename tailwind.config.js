/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#0a0f1a", // Deepest Navy
                foreground: "#f8fafc", // White/Slate-50
                surface: "#111827", // Card Background (cleaner dark)
                primary: {
                    DEFAULT: "#1e40af", // Brand Blue
                    foreground: "#ffffff",
                },
                secondary: {
                    DEFAULT: "#1e293b",
                    foreground: "#94a3b8",
                },
                muted: {
                    DEFAULT: "#1f2937",
                    foreground: "#9ca3af",
                },
                accent: {
                    DEFAULT: "#1e40af",
                    foreground: "#ffffff",
                },
                card: {
                    DEFAULT: "#111827", // Surface
                    foreground: "#f8fafc",
                },
                input: "#1f2937",
                border: "#374151",
            },
            fontFamily: {
                sans: ["var(--font-inter)", "sans-serif"],
            },
            backgroundImage: {
                'glass': 'linear-gradient(145deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
            }
        },
    },
    plugins: [],
}
