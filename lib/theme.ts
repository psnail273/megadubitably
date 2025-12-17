'use client';

import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    xxl: true;
    xxxl: true;
  }
}

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,    // Tailwind sm
      md: 768,    // Tailwind md
      lg: 1024,   // Tailwind lg
      xl: 1280,   // Tailwind xl
      xxl: 1536,  // Tailwind 2xl
      xxxl: 1920, // Tailwind 3xl
    },
  },
});

export default theme;
