/* eslint-disable no-undef */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), dts({
    include: ['./src/**/*.css'], // Include paths to your CSS modules
  }),
  // googleFonts({
  //   fonts: [
  //     {
  //       family: 'Roboto', // Example font
  //       weights: ['400', '700'], // Add different weights if needed
  //     },
  //     {
  //       family: 'Open Sans',
  //       weights: ['300', '400', '600'],
  //     },{
  //       family: 'Manrope',
  //       weights: ['300', '400', '700'],
  //     }
  //   ],
  // }),
],
  resolve: {
    alias: {
    
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    modules: {
      localsConvention: 'camelCase', // Optional: Converts kebab-case to camelCase in class names
    },
  },
  
})
