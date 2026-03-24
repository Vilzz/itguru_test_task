import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Checkbox from '@mui/material/Checkbox'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import AddIcon from '@mui/icons-material/Add'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import type { Product } from '../types'
import { useTheme } from '@mui/material'
import type { Dispatch } from 'react'

type ProductRowProps = {
  product: Product
  selected: readonly number[]
  setSelected: Dispatch<React.SetStateAction<readonly number[]>>
  index: number
}

const ProductRow = ({ product, selected, setSelected, index }: ProductRowProps) => {
  const isItemSelected = selected.includes(product.id)
  const theme = useTheme()
  const isLowRating = product.rating > 0 && product.rating < 3.5
  const labelId = `enhanced-table-checkbox-${index}`

  const handleClick = (__: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id)
    let newSelected: readonly number[] = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      )
    }
    setSelected(newSelected)
  }

  return (
    <TableRow
      hover
      onClick={(event) => handleClick(event, product.id)}
      role='checkbox'
      aria-checked={isItemSelected}
      tabIndex={-1}
      sx={{
        '& td': { borderBottom: '1px solid', borderColor: theme.palette.text.secondary, py: 1.25 },
        transition: 'background 0.1s',
        cursor: 'pointer',
        borderLeft: isItemSelected
          ? `3px solid ${theme.palette.secondary.main}`
          : `3px solid ${theme.palette.background.default}`,
      }}
    >
      <TableCell padding='checkbox'>
        <Checkbox
          color='secondary'
          checked={isItemSelected}
          slotProps={{
            input: { 'aria-labelledby': labelId },
          }}
        />
      </TableCell>
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Avatar
            src={product.thumbnail}
            variant='rounded'
            sx={{
              width: 40,
              height: 40,
              borderRadius: '10px',
              bgcolor: '#F1F5F9',
              fontSize: 13,
              fontWeight: 700,
              color: '#94A3B8',
              flexShrink: 0,
              border: '1px solid #E2E8F0',
            }}
          >
            {product.title.charAt(0)}
          </Avatar>
          <Box sx={{ minWidth: 0 }}>
            <Typography
              noWrap
              sx={{
                fontWeight: 600,
                fontSize: '0.845rem',
                color: '#0F172A',
                lineHeight: 1.35,
                maxWidth: 220,
              }}
            >
              {product.title}
            </Typography>
            <Typography sx={{ fontSize: '0.71rem', color: '#94A3B8', textTransform: 'capitalize' }}>
              {product.category}
            </Typography>
          </Box>
        </Box>
      </TableCell>
      <TableCell>
        {product.brand ? (
          <Typography variant='subtitle2'>{product.brand}</Typography>
        ) : (
          <Typography sx={{ color: '#CBD5E1', fontSize: '0.8rem' }}>—</Typography>
        )}
      </TableCell>
      <TableCell>
        <Typography
          sx={{
            fontSize: '0.775rem',
            color: '#64748B',
          }}
        >
          {product.sku || '—'}
        </Typography>
      </TableCell>
      <TableCell align='left'>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: 0.5 }}>
          <Typography
            sx={{
              fontSize: '0.85rem',
              fontWeight: 700,
              color: isLowRating ? theme.palette.error.main : theme.palette.text.primary,
            }}
          >
            {product.rating.toFixed(1)}
          </Typography>
          <Typography
            sx={{
              fontSize: '0.85rem',
              fontWeight: 700,
            }}
          >
            / 5
          </Typography>
        </Box>
      </TableCell>
      <TableCell align='left'>
        <Typography sx={{ fontWeight: 700, fontSize: '0.88rem', color: '#0F172A' }}>
          {product.price.toFixed(2)}
        </Typography>
      </TableCell>
      <TableCell>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '32px' }}>
          <Button variant='action'>
            <AddIcon />
          </Button>
          <IconButton sx={{ border: '1px solid', p: 0.2 }}>
            <MoreHorizIcon />
          </IconButton>
        </Box>
      </TableCell>
    </TableRow>
  )
}

export default ProductRow
