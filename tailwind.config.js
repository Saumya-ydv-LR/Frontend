/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/{components,pages,hooks,lib}/**/*.{js,jsx}", // Adjusted to cover current structure
    "./src/*.{js,jsx}" // For App.jsx, index.jsx at root
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      },
      colors: {
        // Standard Tailwind colors are used as per previous instructions.
        // If specific "delwingz-red" etc. were needed, they'd go here.
        // e.g., 'delwingz-red': '#E63946',
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out forwards',
        'pulse-custom': 'pulse-custom 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-custom': 'bounce-custom 1s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'pulse-custom': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.05)' },
        },
        'bounce-custom': {
          '0%, 100%': {
            transform: 'translateY(-5%)',
            animationTimingFunction: 'cubic-bezier(0.8,0,1,1)',
          },
          '50%': {
            transform: 'translateY(0)',
            animationTimingFunction: 'cubic-bezier(0,0,0.2,1)',
          },
        },
      },
    },
  },
  plugins: [],
};
