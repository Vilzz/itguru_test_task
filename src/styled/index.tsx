import { styled } from '@mui/material'
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
export const LayoutBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  height: '100vh',
  width: '100vw',
  backgroundColor: theme.palette.background.default,
}))
export const ProductBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  minWidth: '1920px',
  height: '100%',
  padding: '20px 10px',
  gap: '30px',
})
export const LoginBox = styled(Box)({
  width: '527px',
  height: '716px',
  marginTop: '120px',
  display: 'flex',
  border: '1px solid #EDEDED',
  borderRadius: '40px',
  justifyContent: 'center',
  alignItems: 'center',
  boxShadow: '0 24px 32px 0 rgba(0,0,0,0.1)',
})
export const FormBox = styled(Box)({
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '12px',
})

export const FormCheckbox = styled(Checkbox)(({ theme }) => ({
  '&.Mui-checked': { color: theme.palette.primary.main },
}))

export const TableBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '100%',
  width: '100%',
  backgroundColor: theme.palette.background.paper,
  borderRadius: '10px',
  boxShadow: theme.shadows[1],
}))
export const TableBoxHeader = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '30px',
})
export const Buttons = styled(Box)({
  display: 'flex',
  gap: '10px',
})

export const SearchWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '105px',
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[1],
  borderRadius: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '30px',
}))

export const TableWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  height: '100%',
  marginBottom: '20px',
})
export const TableFooter = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  minHeight: '100px',
})
