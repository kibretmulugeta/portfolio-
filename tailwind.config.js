/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,jsx}',
    './src/components/**/*.{js,jsx}',
    './src/app/**/*.{js,jsx}',
    './src/data/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-dark': '#090A0F',
        'surface-dark': '#12141D',
        'surface-hover': '#1A1D2B',
        'accent-cyan': '#38BDF8',
        'accent-indigo': '#6366F1',
        'accent-emerald': '#10B981',
      },
    },
  },
  plugins: [],
}
