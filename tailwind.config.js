/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'], // ✅ สำคัญ
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3f6ad8',
        },
        secondary: {
          DEFAULT: '#eee',
        },
        muted: {
          DEFAULT: '#212529bf',
        }
      }
    },
  },
  plugins: [],
}

