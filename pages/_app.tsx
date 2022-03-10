import type { AppProps } from 'next/app';

import { CacheProvider } from '@emotion/react';
import { ThemeProvider, CssBaseline } from '@mui/material';

import { createEmotionCache } from '../utility/createEmotionCache';
import { defaultTheme } from '../styles/theme';
import { EmotionCache } from '@emotion/cache';
import { VFC } from 'react';

const clientSideEmotionCache = createEmotionCache();
interface Props extends AppProps {
  emotionCache: EmotionCache;
}

const App: VFC<Props> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
};

export default App;
