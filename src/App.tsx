import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { theme } from './theme'
import { useAppDispatch, useAppSelector } from './hooks'
import { useEffect } from 'react'
import { fetchCurrentUser } from './store/authSlice'
import LoginPage from './pages/LoginPage'
import ProductPage from './pages/ProductPage'
import { LayoutBox } from './styled'
import { ToastContainer } from 'react-toastify'

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    action: true
  }
}

function App() {
  const dispatch = useAppDispatch()
  const { token, user } = useAppSelector((state) => state.auth)
  useEffect(() => {
    if (token && !user) {
      dispatch(fetchCurrentUser())
    }
  }, [token, user, dispatch])
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LayoutBox>{token ? <ProductPage /> : <LoginPage />}</LayoutBox>
      <ToastContainer position='bottom-center' autoClose={2000} />
    </ThemeProvider>
  )
}
export default App
