module.exports = {
  darkMode: 'class',
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a',
        neon: '#00ffaa',
      },
      boxShadow: {
        'neon-glow': '0 0 8px #00ffaa, 0 0 16px #00ffaa',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.text-neon': { textShadow: '0 0 4px #00ffaa' },
        '.border-neon': { boxShadow: '0 0 8px #00ffaa' },
      });
    },
  ],
};
