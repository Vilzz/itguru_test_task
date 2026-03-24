import React from 'react'
import Box, { type BoxProps } from '@mui/material/Box'

const GradientFrame: React.FC<BoxProps> = (props) => {
  return (
    <Box
      width='515px'
      height='704px'
      sx={{
        background: `
          linear-gradient(
            180deg,
            rgb(237, 237, 237,1) 20%,
            rgb(237, 237, 237,0) 100%
          )
        `,
        borderRadius: '34px',
        padding: '1px',
      }}
      {...props}
    />
  )
}

export default GradientFrame
