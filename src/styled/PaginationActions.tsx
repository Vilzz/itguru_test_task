import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import { useTheme } from '@mui/material/styles'
import type TablePaginationActionsProps from '@mui/material/TablePagination'

type TablePaginationActionsProps = {
  count: number
  page: number
  rowsPerPage: number
  onPageChange: (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => void
}
export const CustomPaginationActions = ({
  count,
  page,
  rowsPerPage,
  onPageChange,
}: TablePaginationActionsProps) => {
  const theme = useTheme()
  const totalPages = Math.ceil(count / rowsPerPage)
  const startPage = Math.max(0, page - 2)
  const endPage = Math.min(totalPages - 1, startPage + 4)
  const pages = []
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i)
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <IconButton onClick={(e) => onPageChange(e, page - 1)} disabled={page === 0}>
        <KeyboardArrowLeft />
      </IconButton>
      {pages.map((p) => (
        <Button
          key={p}
          onClick={(e) => onPageChange(e, p)}
          sx={{
            minWidth: 30,
            width: 30,
            height: 30,
            padding: 0,
            borderRadius: '4px',
            backgroundColor: p === page ? theme.palette.primary.main : theme.palette.grey[200],
            color: p === page ? theme.palette.primary.contrastText : theme.palette.text.primary,
            '&:hover': {
              backgroundColor: p === page ? theme.palette.primary.dark : theme.palette.grey[300],
            },
          }}
        >
          {p + 1}
        </Button>
      ))}
      <IconButton onClick={(e) => onPageChange(e, page + 1)} disabled={page >= totalPages - 1}>
        <KeyboardArrowRight />
      </IconButton>
    </Box>
  )
}
