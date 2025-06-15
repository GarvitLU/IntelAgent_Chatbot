/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                background: "#08051a",
                secondary: "#100828",
                primary: "#9063e8",
                textLight: "#ffffff",
                textDark: "#333333",
                foreground: "var(--foreground)",
                border: "var(--border)",
                ring: "var(--ring)",
                card: "var(--card)",
                "card-foreground": "var(--card-foreground)",
                popover: "var(--popover)",
                "popover-foreground": "var(--popover-foreground)",
                muted: "var(--muted)",
                "muted-foreground": "var(--muted-foreground)",
                accent: "var(--accent)",
                "accent-foreground": "var(--accent-foreground)",
                destructive: "var(--destructive)",
                input: "var(--input)",
            },
            borderColor: {
                DEFAULT: "var(--border)",
            },
        },
    },
    plugins: [],
};
