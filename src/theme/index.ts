import { createTheme } from '@mui/material/styles'
export const theme = createTheme({
  palette: {
    primary: {
      main: '#242EDB',
      light: '#367AFF',
      contrastText: '#FFFFFF',
    },
    secondary: {
      light: '#797FEA',
      main: '#3C538E',
    },
    background: {
      paper: '#FFFFFF',
      default: '#F9F9F9',
    },
    text: {
      primary: '#232323',
      secondary: '#9C9C9C',
    },
    error: {
      main: '#EF4444',
    },
    warning: {
      main: '#F59E0B',
    },
    success: {
      main: '#10B981',
    },
  },
  typography: {
    fontFamily: '"Inter", sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'action' },
          style: ({ theme }) => ({
            minWidth: '52px',
            height: '27px',
            borderRadius: '23px',
            lineHeight: '1',
            padding: '4px',
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            boxShadow: theme.shadows[1],
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
            },
          }),
        },
      ],
    },
  },
})
