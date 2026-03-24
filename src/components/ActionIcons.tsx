import IconButton from '@mui/material/IconButton'
import LanguageIcon from '@mui/icons-material/Language'
import NotificationsIcon from '@mui/icons-material/Notifications'
import EmailIcon from '@mui/icons-material/Email'
import TuneIcon from '@mui/icons-material/Tune'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'

const ActionsBox = styled(Box)({
  minWidth: '200px',
  display: 'flex',
  justifyContent: 'space-between',
})
const ActionIcons = () => {
  return (
    <ActionsBox>
      <IconButton>
        <LanguageIcon />
      </IconButton>
      <IconButton>
        <NotificationsIcon />
      </IconButton>
      <IconButton>
        <EmailIcon />
      </IconButton>
      <IconButton>
        <TuneIcon sx={{ transform: 'rotate(90deg)' }} />
      </IconButton>
    </ActionsBox>
  )
}

export default ActionIcons
