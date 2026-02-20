/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#AF3336',
        secondary: '#2D3748',     // cool charcoal gray - better contrast & premium
        accent: '#D4AF37',        // soft subtle gold (luxury touch, not brassy)
        bgLight: '#FDFDFD',       // almost white, very clean
        dark: '#111827',
        neutral: '#6B7280',
        muted: '#9CA3AF',         // soft gray for subtitles
        charcoal: '#111827',     // deep dark for premium bg
        gold: '#D4AF37',         // subtle luxury accent
      },
      fontFamily: {
        cookie: ['Cookie', 'cursive'],
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #AF3336 0%, #FF8F00 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #FF8F00 0%, #FFC107 100%)',
        'gradient-trust': 'linear-gradient(135deg, #111827 0%, #1F2937 100%)',
        'gradient-cta': 'linear-gradient(135deg, #AF3336 0%, #111827 100%)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'fade-in': 'fadeIn 1.2s ease-out forwards',
        'count-up': 'countUp 2s ease-out forwards',
        'glow-pulse': 'glowPulse 4s ease-in-out infinite',
        'borderGlow': "borderGlow 3s linear infinite",

      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        countUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        borderGlow: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },

      },
    },
  },
  plugins: [],
};

// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
//   theme: {
//     extend: {
//       colors: {
//         primary: '#AF3336',
//         secondary: '#FFD700',
//         accent: '#FFC107',
//         bgLight: '#fff',
//         dark: '#1F1F1F',
//         neutral: '#6B7280',
//       },
//       fontFamily: {
//         cookie: ['Cookie', 'cursive'],
//         poppins: ['Poppins', 'sans-serif'],
//         inter: ['Inter', 'sans-serif'],
//       },
//       backgroundImage: {
//         'gradient-primary': 'linear-gradient(135deg, #AF3336 0%, #FF8F00 100%)',
//         'gradient-secondary': 'linear-gradient(135deg, #FF8F00 0%, #FFC107 100%)',
//       },
//     },
//   },
//   plugins: [],
// };
