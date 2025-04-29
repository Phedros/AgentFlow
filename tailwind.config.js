/** @type {import('tailwindcss').Config} */
export default {
    // ajusta estas rutas al layout de tu proyecto
    content: [
      './index.html',
      './src/**/*.{js,jsx,ts,tsx}',
      './components/**/*.{js,jsx,ts,tsx}',
      './pages/**/*.{js,jsx,ts,tsx}'
    ],
    theme: {
      extend: {
        // aquí puedes extender tu tema si necesitas
      },
    },
    plugins: [
      // si usas tw-animate-css:
      require('tailwindcss-animate'),
      // otros plugins que uses (forms, typography, etc)
    ],
  }
  