import React from 'react'
import Box, { type BoxProps } from '@mui/material/Box'

const LogoFrameBackground: React.FC<BoxProps> = (props) => {
  return (
    <Box
      width='100%'
      height='100%'
      sx={{
        background: `
          linear-gradient(
            180deg,
            rgb(237, 237, 237,0.7) 0%,
            rgb(237, 237, 237,0) 70%
          )
        `,
        borderRadius: '50%',
        padding: '1px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      {...props}
    />
  )
}

export default LogoFrameBackground
