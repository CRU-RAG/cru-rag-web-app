/* eslint-disable no-undef */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts';
import path from 'path';


export default defineConfig({
  plugins: [react(), dts({
    include: ['./src/**/*.css'], // Include paths to your CSS modules
  }),
 
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
