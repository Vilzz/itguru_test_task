import React from 'react'
import Box, { type BoxProps } from '@mui/material/Box'

const LogoGradientBackground: React.FC<BoxProps> = (props) => {
  return (
    <Box
      width='100%'
      height='100%'
      sx={{
        background: `
          linear-gradient(
            0deg,
            rgb(35, 35, 35, 0) 50%,
            rgb(35, 35, 35, 0.06) 100%
          ), #ffffff
        `,
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      {...props}
    />
  )
}

export default LogoGradientBackground
