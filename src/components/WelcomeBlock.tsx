import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const WelcomeBlock = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '12px',
      }}
    >
      <Typography
        variant='h4'
        fontSize={40}
        sx={{ color: '#232323', lineHeight: '110%', letterSpacing: '-1.5%' }}
      >
        Добро пожаловать!
      </Typography>
      <Typography
        variant='h6'
        fontSize={18}
        sx={{
          color: '#a8a8a8', //#E0E0E0 - цвет из фигмы
          lineHeight: '150%',
          letterSpacing: '0%',
          //WebkitBackgroundClip: 'text',
          //textShadow: '0 4px 4px rgba(0, 0, 0, 0.17)',
          //WebkitTextFillColor: 'transparent',
        }}
      >
        Пожалуйста, авторизуйтесь
      </Typography>
    </Box>
  )
}

export default WelcomeBlock
