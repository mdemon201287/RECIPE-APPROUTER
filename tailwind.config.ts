import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'bg-image1': "url('/images/background1.jpg')",
        'bg-image2': "url('/images/background2.jpg')",
        'bg-image3': "url('/images/background3.jpg')",
        'bg-image4': "url('/images/background4.jpg')",
      },
    },
  },
  plugins: [],
};

export default config;
