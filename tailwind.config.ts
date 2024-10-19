import type { Config } from 'tailwindcss';

const config: Config = {
  important: true,
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/layouts/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#091e6a',
        surface: '#f8f8f8',
        borderColor:'#00000058',
        gray:"#45464",
        customBlack: '#000000',
        grayy: "#000000"
      },
    },
  },
  plugins: [],
};
export default config;
