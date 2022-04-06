import { createTheme } from '@mui/material/styles';

export const defaultTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          height: 56,
        },
      },
    },
  },
});
