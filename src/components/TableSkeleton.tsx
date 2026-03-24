import Skeleton from '@mui/material/Skeleton'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

type SkeletonRowsProps = {
  rows: number
  cols: number
}
export const SkeletonRows = ({ rows, cols }: SkeletonRowsProps) => (
  <>
    {Array.from({ length: rows }).map((_, i) => (
      <TableRow key={i}>
        {Array.from({ length: cols }).map((__, j) => (
          <TableCell key={j} sx={{ py: 1.25 }}>
            <Skeleton variant='rounded' height={40} sx={{ borderRadius: 1 }} />
          </TableCell>
        ))}
      </TableRow>
    ))}
  </>
)
