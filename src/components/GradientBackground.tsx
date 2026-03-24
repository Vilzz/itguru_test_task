import React from 'react'
import Box, { type BoxProps } from '@mui/material/Box'

const GradientBackground: React.FC<BoxProps> = (props) => {
  return (
    <Box
      width='100%'
      height='100%'
      sx={{
        background: `
          linear-gradient(
            180deg,
            rgb(35, 35, 35, 0.03) 0%,
            rgb(35, 35, 35, 0) 50%
          )
        `,
        borderRadius: '34px',
        padding: '48px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: '32px',
      }}
      {...props}
    />
  )
}

export default GradientBackground
