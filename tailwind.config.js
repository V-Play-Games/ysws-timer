/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}"
    ],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ["'Exo 2'", 'Helvetica', 'Arial', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
