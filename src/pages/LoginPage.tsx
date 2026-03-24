import { useEffect, useState, type SyntheticEvent } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { clearError, loginUser } from '../store/authSlice'
import { FormBox, FormCheckbox, LoginBox } from '../styled'
import GradientFrame from '../components/GradientFrame'
import GradientBackground from '../components/GradientBackground'

import LogoFrame from '../components/LogoFrame'
import LogoGradientBackground from '../components/LogoGradientBackground'
import LogoFrameBackground from '../components/LogoFrameBackground'
import WelcomeBlock from '../components/WelcomeBlock'
import Box from '@mui/material/Box'
import { LogoIcon } from '../assets/LogoIcon'
import { Visibility, VisibilityOff, LockOutlined, PersonOutline } from '@mui/icons-material'
import IconButton from '@mui/material/IconButton'
import { ItGuruTextField } from '../styled/LoginInput'
import FormControlLabel from '@mui/material/FormControlLabel'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Divider from '@mui/material/Divider'
import { toast } from 'react-toastify'
import Link from '@mui/material/Link'

const LoginPage = () => {
  const dispatch = useAppDispatch()
  const { loading, error } = useAppSelector((state) => state.auth)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [usernameError, setUsernameError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(clearError())
    }
  }, [error, dispatch])

  const validate = (): boolean => {
    let valid = true
    if (!username.trim()) {
      setUsernameError('Необходимо ввести имя пользователя')
      valid = false
    } else {
      setUsernameError('')
    }
    if (!password.trim()) {
      setPasswordError('Необходимо ввести пароль')
      valid = false
    } else {
      setPasswordError('')
    }
    return valid
  }
  const handleSubmit = (evt: SyntheticEvent<HTMLFormElement>) => {
    evt.preventDefault()
    if (!validate()) return
    dispatch(loginUser({ username, password, rememberMe }))
  }

  return (
    <LoginBox>
      <GradientFrame>
        <GradientBackground>
          <LogoFrame>
            <LogoFrameBackground>
              <LogoGradientBackground>
                <LogoIcon />
              </LogoGradientBackground>
            </LogoFrameBackground>
          </LogoFrame>
          <WelcomeBlock />
          <FormBox>
            <Box
              component='form'
              onSubmit={handleSubmit}
              noValidate
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
                gap: '14px',
              }}
            >
              <ItGuruTextField
                label='Логин'
                value={username}
                placeholder='Тест'
                error={!!usernameError}
                onChange={(e) => setUsername(e.target.value)}
                startIcon={<PersonOutline sx={{ color: '#94A3B8', fontSize: 24 }} />}
                clearable
              />
              <ItGuruTextField
                label='Пароль'
                value={password}
                type={showPassword ? 'text' : 'password'}
                error={!!passwordError}
                onChange={(e) => setPassword(e.target.value)}
                startIcon={<LockOutlined sx={{ color: '#94A3B8', fontSize: 24 }} />}
                endIcon={
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge='end'
                    size='small'
                  >
                    {showPassword ? (
                      <VisibilityOff sx={{ fontSize: 24 }} />
                    ) : (
                      <Visibility sx={{ fontSize: 24 }} />
                    )}
                  </IconButton>
                }
              />
              <FormControlLabel
                control={
                  <FormCheckbox
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    size='large'
                  />
                }
                label={
                  <Typography sx={{ fontSize: '0.875rem', color: '#475569' }}>
                    Запомнить данные
                  </Typography>
                }
              />
              <Button
                type='submit'
                fullWidth
                variant='contained'
                size='large'
                disabled={loading}
                sx={{ mb: 1, py: 1.5, fontSize: '18px', fontWeight: 600, textTransform: 'none' }}
              >
                {loading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : 'Войти'}
              </Button>
            </Box>
            <Divider sx={{ width: '100%' }}>
              <Typography sx={{ color: '#94A3B8', fontSize: '0.8rem', px: 1 }}>ИЛИ</Typography>
            </Divider>
            <Typography sx={{ textAlign: 'center', fontSize: '0.875rem', color: '#64748B' }}>
              Нет аккаунта?{' '}
              <Link
                href='#'
                onClick={(e) => e.preventDefault()}
                sx={{
                  color: '#4F46E5',
                  fontWeight: 600,
                  textDecoration: 'none',
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                Создать
              </Link>
            </Typography>

            <Typography
              sx={{
                textAlign: 'center',
                fontSize: '0.7rem',
                color: 'rgba(0,0,0,0.3)',
                mt: 3,
              }}
            >
              Тест данные: Логин <strong>emilys</strong> / Пароль <strong>emilyspass</strong>
            </Typography>
          </FormBox>
        </GradientBackground>
      </GradientFrame>
    </LoginBox>
  )
}

export default LoginPage
