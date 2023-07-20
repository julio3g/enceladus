/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{ts,tsx,mdx}',
    './src/components/**/*.{ts,tsx,mdx}',
    './src/**/*.{ts,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        white: '#FAFAFA',
        body: '#EEF6F1',
      },
      boxShadow: {
        '3xl': '0px 0px 0px 3px #86EFAC',
      },
    },
  },
  plugins: [],
}
