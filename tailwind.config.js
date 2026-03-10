/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'jakarta': ['Plus Jakarta Sans', 'sans-serif'],
      },
      colors: {
        // Design tokens from Figma - Dashboard Light Theme
        'background': '#FFFEFA',
        'card-background': '#FFFFFC',
        'text-primary': '#28261B',
        'text-secondary': 'rgba(46, 42, 20, 0.62)',
        'input-background': 'rgba(126, 52, 37, 0.09)',
        'button-primary': '#FF5733',
        'button-text': '#000000',
        'gesture-indicator': 'rgba(126, 112, 37, 0.09)',
        'battery-outline': 'rgba(46, 42, 20, 0.4)',
        'battery-fill': '#28261B',
        // Dark theme colors from Figma - Cash Deposit Screen
        'background-dark': '#0D0402',
        'input-background-dark': 'rgba(224, 191, 184, 0.12)',
        'text-light': '#E4DAD7',
        'text-placeholder': 'rgba(235, 213, 209, 0.62)',
        'text-icon': '#6E5049',
        'text-icon-dark': '#281D1B',
        'button-primary-dark': '#F24822',
        'gesture-indicator-dark': 'rgba(218, 145, 129, 0.09)',
      },
      fontSize: {
        'status': ['17px', { lineHeight: '1.2102272931267233em', fontWeight: '600' }],
        'title': ['17px', { lineHeight: '1.2600000044878792em', fontWeight: '700', letterSpacing: '-2%' }],
        'heading': ['18px', { lineHeight: '1.21em', fontWeight: '600', letterSpacing: '-2.5%' }],
        'input': ['17px', { lineHeight: '1.35em', fontWeight: '400', letterSpacing: '-0.5%' }],
        'button': ['17px', { lineHeight: '1.35em', fontWeight: '500' }],
        'card-title': ['17px', { lineHeight: '1.2600000044878792em', fontWeight: '700', letterSpacing: '-2%' }],
        'card-subtitle': ['13px', { lineHeight: '1.2599999354435847em', fontWeight: '500' }],
      },
      spacing: {
        '13': '13px',
        '13.5': '13.5px',
        '14.5': '14.5px',
        '26': '104px',
      },
      borderRadius: {
        '16': '16px',
        '48': '48px',
        '360': '360px',
      },
    },
  },
  plugins: [],
}