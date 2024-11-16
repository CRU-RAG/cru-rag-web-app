import React from 'react';
import ReactDOM from 'react-dom/client';
import ChatApp from './ChatApp';
import { ThemeProvider } from 'next-themes';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider enableSystem={true} defaultTheme="dark" attribute="class">

    <ChatApp />
    </ThemeProvider>
  </React.StrictMode>
);
