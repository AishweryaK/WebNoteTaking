/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{html,js,ts,jsx,tsx}'],
  darkMode:"class",
  theme: {
    extend: {
      colors: {
        'my-blue-0': '#c3b8ff',
        'my-blue-100': '#b5a6ff',
        'my-blue-200': '#9783ff',
        'my-blue-300': '#8871ff',
        'my-blue-400': '#795fff',
        'my-blue-500D': '#6B4EFF', //default color
        'my-blue-600': '#6046e5',
        'my-blue-700': '#553ecc',
        'my-blue-800': '#4a36b2',
        'my-blue-900': '#402e99',
        'my-background': '#F9F8FD', //default color
        'my-background-100': '#e8e4f7',
        'my-background-200': '#d7d0f2',
        'my-background-300': '#c6bdec',
        'my-hover': '#E1E2E3',
      },
      height: {
        98: '40rem',
      },
    },
  },
  plugins: [],
};
