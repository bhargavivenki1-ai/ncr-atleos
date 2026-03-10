# ATM Cash Withdrawal Journey

A modern, accessible, and responsive ATM cash withdrawal interface built with React and Tailwind CSS, following atomic design principles and web development best practices.

## 🎯 Features

- **Token-Driven Design**: All styles are driven by design tokens from Figma, ensuring consistency and easy maintenance
- **Modular Architecture**: Built using atomic design pattern (atoms, molecules, organisms)
- **Fully Accessible**: WCAG AA compliant with proper ARIA labels, keyboard navigation, and screen reader support
- **Responsive Design**: Optimized for all screen sizes with mobile-first approach
- **Well-Tested**: Comprehensive unit tests using Jest and React Testing Library
- **Service-Mocks**: Use mocks for now, that will be replaced with service responses later. Use industry standard framework for this.

## 📁 Project Structure

```
NCR-ATLEOS/
├── src/
│   ├── components/
│   │   ├── atoms/           # Basic building blocks
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── TextField.jsx
│   │   │   ├── TextFieldWithIcon.jsx
│   │   │   ├── StatusBar.jsx
│   │   │   ├── Icon.jsx
│   │   │   ├── RoundButton.jsx
│   │   │   ├── Title.jsx
│   │   │   ├── GestureIndicator.jsx
│   │   │   └── __tests__/
│   │   ├── molecules/       # Combinations of atoms
│   │   │   ├── SelectionOption.jsx
│   │   │   └── CardForm.jsx
│   │   └── organisms/       # Complex components
│   │       ├── Header.jsx
│   │       ├── CardDetailsForm.jsx
│   │       ├── AmountSelection.jsx
│   │       └── __tests__/
│   ├── pages/
│   │   └── ATMCashWithdrawal.jsx
│   ├── App.jsx
│   ├── index.js
│   └── index.css
├── public/
│   └── index.html
├── assets/
│   └── icons/
├── design-tokens.json       # Design system tokens
├── tailwind.config.js       # Tailwind configuration with design tokens
└── README.md
```

## 🧩 Component Architecture

### Atoms
Basic building blocks that cannot be broken down further:
- `Button`: Primary action button with states
- `Input`: Basic input field
- `TextField`: Input without icon
- `TextFieldWithIcon`: Input with icon support
- `StatusBar`: System status display
- `Icon`: SVG icon wrapper
- `RoundButton`: Circular icon button
- `Title`: Section title
- `GestureIndicator`: Bottom gesture bar

### Molecules
Combinations of atoms:
- `SelectionOption`: Selectable option with icon and label
- `CardForm`: Basic card form structure

### Organisms
Complex components composed of molecules and atoms:
- `Header`: Header with status bar and navigation
- `CardDetailsForm`: Complete card details form with validation
- `AmountSelection`: Amount selection with multiple options

### Pages
Complete page layouts:
- `ATMCashWithdrawal`: Main ATM cash withdrawal journey page

## ♿ Accessibility Features

- **Semantic HTML**: Proper use of semantic elements (header, main, footer, section)
- **ARIA Labels**: Comprehensive ARIA labels for screen readers
- **Keyboard Navigation**: Full keyboard support with visible focus indicators
- **Screen Reader Support**: Hidden labels for screen reader context
- **Color Contrast**: WCAG AA compliant color contrast ratios
- **Focus Management**: Proper focus order and visible focus states

## 📱 Responsive Design

- Mobile-first approach
- Flexible layouts using Flexbox
- Responsive typography
- Touch-friendly interactive elements
- Optimized for various screen sizes

## 🔧 Technologies Used

- **React**: UI library
- **Tailwind CSS**: Utility-first CSS framework
- **Jest**: Testing framework
- **React Testing Library**: Component testing
- **Google Fonts**: Inter and Public Sans fonts

## 📝 Best Practices To Be Implemented

- **DRY Principle**: Reusable components and design tokens
- **Single Responsibility**: Each component has a single, well-defined purpose
- **Prop Validation**: JSDoc documentation for type safety
- **Error Handling**: Proper error boundaries and validation
- **Performance**: Optimized re-renders with React best practices
- **Security**: Input validation and sanitization
- **Code Quality**: Consistent code style and formatting