/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html',
  "./src/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        'my-blue' : '#6B4EFF',
        'my-background' : '#F9F8FD',
      },
      height : {
        '98' : '40rem'
      }
    },
  },
  plugins: [],
}

