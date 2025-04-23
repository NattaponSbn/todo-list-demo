/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'], // ✅ สำคัญ
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#E85C24',
        },
        secondary: {
          DEFAULT: '#eee',
        },
        danger: {
          DEFAULT: '#ff3823',
        },
        muted: {
          DEFAULT: '#212529bf',
        },
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}

