/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        pastelPink: '#ffd1dc',
        pastelPeach: '#ffedd5',
        pastelMint: '#d1fae5',
        pastelLilac: '#e9d5ff',
        pastelSky: '#e0f2fe',
      }
    }
  },
  plugins: [],
}

