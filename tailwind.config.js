/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: {
        '50%': '50%',
        '25%': '25%',
        '35%': '35%',
        '128': '128rem'
      },
      margin: {
        '-mr-25%': '25%',
        'ml-50%':'50%'
      },

    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],

}
