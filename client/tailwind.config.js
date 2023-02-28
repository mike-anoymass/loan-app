/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
          // Bounces 5 times 1s equals 5 seconds
          'bounce-short': 'bounce 1s ease-in-out 3',
          'ping-short': 'ping 1s ease-in-out 1',
        }
    },
  },
  plugins: [],
}