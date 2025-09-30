# Support Request Form

A modern React application for submitting and managing support requests. This project demonstrates the use of React, React Hook Form, Zod validation, Redux Toolkit for state management, and comprehensive testing with Vitest.

## Features

- **Dynamic Form Handling**: Interactive form with various input types (text, email, dropdown, multi-select)
- **Dynamic Fields**: Add/remove steps using React Hook Form's _useFieldArray_
- **Form Validation**: Client-side validation with Zod schemas
- **State Management**: Redux Toolkit for global state management
- **Routing**: Multi-page navigation with React Router DOM
- **Styling**: Modern UI with Tailwind CSS
- **Testing**: Comprehensive test suite with Vitest and React Testing Library

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- pnpm (recommended) or npm

### Installation

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Start the development server:

   ```bash
   pnpm run dev
   ```

3. Open your browser and navigate to `http://localhost:3000`

## Available Scripts

- `pnpm run dev` - Start development server
- `pnpm run build` - Build for production
- `pnpm run preview` - Preview production build locally
- `pnpm run test` - Run tests in watch mode
- `pnpm run test:run` - Run tests once
- `pnpm run lint` - Run ESLint

## Testing

Run tests with:

```bash
pnpm run test:run
```

## Project Structure

```
src/
├── components/         # Reusable UI components
├── models/             # TypeScript interfaces and constants
├── pages/              # Page components
├── store/              # Redux store configuration
├── test/               # Test setup and utilities
└── utils/              # Utility functions and schemas
```
