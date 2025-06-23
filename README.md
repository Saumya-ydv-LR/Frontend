# Delwingz Food Delivery App

This is a modern web application for ordering non-veg food items, built with React and Vite.

## Project Structure

- **`index.html`**: The main HTML entry point.
- **`index.jsx`**: The main React application entry point.
- **`App.jsx`**: The root React component defining routes and global providers.
- **`components/`**: Contains reusable UI components.
  - **`ui/`**: Generic UI elements like Button, Card, Toast.
- **`pages/`**: Contains page-level components for different routes.
- **`hooks/`**: Custom React hooks.
- **`lib/`**: Utility functions.
- **`public/`**: Static assets (e.g., `favicon.ico`).
- **`vite.config.js`**: Vite configuration.
- **`tailwind.config.js`**: Tailwind CSS configuration.
- **`postcss.config.js`**: PostCSS configuration.
- **`index.css`**: Global styles and Tailwind directives.

## Prerequisites

- Node.js (version 18.x or later recommended)
- npm (or yarn/pnpm)

## Setup

1.  **Clone the repository (if applicable) or download the files.**
2.  **Navigate to the project directory:**
    ```bash
    cd your-project-directory
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```
    (or `yarn install` or `pnpm install`)

4.  **Environment Variables:**
    Create a `.env.development` file in the root of the project (next to `package.json`). Add your backend API URL to it:
    ```env
    VITE_BACKEND_URL=http://your-backend-api-url.com
    ```
    Replace `http://your-backend-api-url.com` with your actual backend server address.

## Running the Development Server

To start the development server:
```bash
npm run dev
```
This will typically start the app on `http://localhost:3000` and automatically open it in your browser.

## Building for Production

To create a production build:
```bash
npm run build
```
The optimized static files will be generated in the `dist/` directory.

## Previewing the Production Build

To preview the production build locally:
```bash
npm run preview
```
This will serve the `dist/` folder.

## Linting

To lint the project files:
```bash
npm run lint
```

## Available Scripts

- `npm run dev`: Starts the Vite development server.
- `npm run build`: Builds the application for production.
- `npm run lint`: Lints the JavaScript/JSX files.
- `npm run preview`: Serves the production build locally for preview.
