import Box, { type BoxProps } from '@mui/material/Box'
const LogoFrame: React.FC<BoxProps> = (props) => {
  return (
    <Box
      width='52px'
      height='52px'
      sx={{
        minHeight: '52px',
        background: '#FFFFFF',
        borderRadius: '50%',
        padding: '1px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0px 0px 0px 2px rgba(255, 255, 255, 1), 0px 12px 8px 0px rgba(0, 0, 0, 0.03)',
      }}
      {...props}
    />
  )
}

export default LogoFrame
