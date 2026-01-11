/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                border: "var(--border)",
                brand: {
                    dark: "#0a0f1a",
                    blue: "#1e40af",
                    slate: "#1e293b",
                    light: "#f8fafc",
                    gray: "#94a3b8",
                },
                primary: {
                    DEFAULT: "#1e40af", // brand-blue
                    foreground: "#ffffff",
                },
                secondary: {
                    DEFAULT: "#1e293b", // brand-slate
                    foreground: "#f8fafc",
                },
                muted: {
                    DEFAULT: "#1e293b", // brand-slate
                    foreground: "#94a3b8", // brand-gray
                },
                accent: {
                    DEFAULT: "#1e293b", // brand-slate
                    foreground: "#f8fafc",
                },
                destructive: {
                    DEFAULT: "#ef4444",
                    foreground: "#ffffff",
                },
                input: "#1e293b", // brand-slate
                ring: "#1e40af", // brand-blue
                card: {
                    DEFAULT: "#0a0f1a", // brand-dark
                    foreground: "#f8fafc",
                },
                popover: {
                    DEFAULT: "#0a0f1a", // brand-dark
                    foreground: "#f8fafc",
                },
            },
            fontFamily: {
                sans: ["var(--font-inter)", "sans-serif"],
            },
            borderRadius: {
                lg: "0.5rem",
                md: "calc(0.5rem - 2px)",
                sm: "calc(0.5rem - 4px)",
            },
        },
    },
    plugins: [],
}
