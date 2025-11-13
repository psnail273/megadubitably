'use client';

import { CacheProvider } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';
import createEmotionCache from '@/lib/createEmotionCache';
import theme from '@/lib/theme';
import { useState } from 'react';

export default function MuiRegistry({ children }: { children: React.ReactNode }) {
  const [cache] = useState(() => createEmotionCache());

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}
