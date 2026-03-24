import Box from '@mui/material/Box'
import {
  ProductBox,
  SearchWrapper,
  TableFooter,
  TableWrapper,
  Buttons,
  TableBox,
  TableBoxHeader,
} from '../styled'
import { ItGuruTextField } from '../styled/LoginInput'
import SearchIcon from '@mui/icons-material/Search'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import LinearProgress from '@mui/material/LinearProgress'
import CachedIcon from '@mui/icons-material/Cached'
import TablePagination from '@mui/material/TablePagination'
import TableSortLabel from '@mui/material/TableSortLabel'
import { CustomPaginationActions } from '../styled/PaginationActions'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { addLocalProduct, fetchProducts } from '../store/productSlice'
import ActionIcons from '../components/ActionIcons'
import type { Column, NewProduct, Order, Product, SortableField } from '../types'
import { SkeletonRows } from '../components/TableSkeleton'
import ProductRow from '../components/ProductRow'
import AddProductDialog from '../components/AddProductDialog'

const ProductPage = () => {
  const dispatch = useAppDispatch()
  const { items, total, loading } = useAppSelector((state) => state.products)
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(8)
  const [sortOrder, setSortOrder] = useState<Order>('asc')
  const [sortBy, setSortBy] = useState<string>('title')
  const [selected, setSelected] = useState<readonly number[]>([])
  const [localSearch, setLocalSearch] = useState('')
  const [searchDebounce, setSearchDebounce] = useState<ReturnType<typeof setTimeout> | null>(null)
  const [addOpen, setAddOpen] = useState(false)

  useEffect(() => {
    dispatch(fetchProducts({ searchQuery: localSearch, sortBy, sortOrder, page, pageSize }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleRefresh = () => {
    setPage(0)
    setPageSize(8)
    setSortOrder('asc')
    setSortBy('title')
    setSelected([])
    setLocalSearch('')
    setSearchDebounce(null)
    dispatch(fetchProducts({ searchQuery: '', sortBy, sortOrder, page: 0, pageSize }))
  }

  const handleSort = (field: SortableField) => {
    let newOrder: Order
    if (sortBy === field) {
      newOrder = ['asc', 'desc'].filter((el) => el !== sortOrder)[0] as Order
    } else {
      newOrder = 'asc'
    }
    setSortOrder(newOrder)
    setSortBy(field)
    setPage(0)
    dispatch(
      fetchProducts({ searchQuery: localSearch, sortBy, sortOrder: newOrder, page, pageSize }),
    )
  }

  const handleSearchChange = (val: string) => {
    setLocalSearch(val)
    if (searchDebounce) clearTimeout(searchDebounce)
    const t = setTimeout(() => {
      dispatch(
        fetchProducts({
          searchQuery: val,
          sortBy: 'title',
          sortOrder: 'asc',
          page: 0,
          pageSize: 8,
        }),
      )
    }, 450)
    setSearchDebounce(t)
  }
  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = items.map((n) => n.id)
      setSelected(newSelected)
      return
    }
    setSelected([])
  }
  const handlePageChange = (_: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage)
    dispatch(
      fetchProducts({ searchQuery: localSearch, sortBy, sortOrder, page: newPage, pageSize }),
    )
  }
  const handleRowsPerPageChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const newSize = parseInt(e.target.value, 10)
    setPageSize(newSize)
    setPage(0)
    dispatch(
      fetchProducts({ searchQuery: localSearch, sortBy, sortOrder, page: 0, pageSize: newSize }),
    )
  }

  const handleAddProduct = (product: NewProduct) => {
    const newItem: Product = {
      id: Date.now(),
      title: product.title,
      price: product.price,
      brand: product.brand,
      sku: product.sku,
      description: product.description ?? '',
      discountPercentage: 0,
      rating: 0,
      stock: product.stock ?? 0,
      category: product.category ?? 'general',
      thumbnail: '',
      images: [],
      availabilityStatus: 'In Stock',
      minimumOrderQuantity: 1,
      meta: {
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        barcode: '',
        qrCode: '',
      },
      dimensions: { width: 0, height: 0, depth: 0 },
      warrantyInformation: '',
      shippingInformation: '',
      returnPolicy: '',
      tags: [],
      weight: 0,
    }
    dispatch(addLocalProduct(newItem))
    setAddOpen(false)
  }

  const COLUMNS: Column[] = [
    { id: 'title', label: 'Наименование', sortable: true },
    { id: 'brand', label: 'Вендор', sortable: true },
    { id: 'sku', label: 'Артикул', sortable: true },
    { id: 'rating', label: 'Оценка', sortable: true, align: 'left' },
    { id: 'price', label: 'Цена, ₽', sortable: true, align: 'left' },
    { id: 'actions', label: '', sortable: false, align: 'center' },
  ]
  return (
    <ProductBox>
      <SearchWrapper>
        <Typography variant='h5' sx={{ fontSize: '24px', fontWeight: 600, color: '#0F172A' }}>
          Товары
        </Typography>
        <Box sx={{ width: '1023px' }}>
          <ItGuruTextField
            size='small'
            placeholder='Найти'
            onChange={(evt) => handleSearchChange(evt.target.value)}
            value={localSearch}
            startIcon={<SearchIcon sx={{ color: '#94A3B8', fontSize: 24 }} />}
          />
        </Box>
        <ActionIcons />
      </SearchWrapper>
      <TableBox>
        <TableBoxHeader>
          <Typography variant='h5' sx={{ fontSize: '20px' }}>
            Все продукты
          </Typography>
          <Buttons>
            <Tooltip title='Обновить'>
              <IconButton
                sx={{ borderRadius: '7px', border: '1px solid #C2C2C2' }}
                onClick={handleRefresh}
              >
                <CachedIcon />
              </IconButton>
            </Tooltip>
            <Button
              variant='contained'
              size='small'
              onClick={() => setAddOpen(true)}
              sx={{ borderRadius: '6px', textTransform: 'none', fontSize: '14px', fontWeight: 400 }}
            >
              <AddCircleOutlineIcon sx={{ mr: 2 }} fontSize='small' />
              Добавить
            </Button>
          </Buttons>
        </TableBoxHeader>
        <TableWrapper>
          <Box sx={{ height: 5, width: '100%', px: 5 }}>
            {loading && <LinearProgress sx={{ height: 5, width: '100%' }} />}
          </Box>
          <TableContainer sx={{ px: 4 }}>
            <Table size='small' sx={{ width: 1800 }}>
              <TableHead>
                <TableRow>
                  <TableCell padding='checkbox' align='left'>
                    <Checkbox
                      color='secondary'
                      indeterminate={selected.length > 0 && selected.length < items.length}
                      checked={items.length > 0 && selected.length === items.length}
                      onChange={handleSelectAllClick}
                      slotProps={{
                        input: { 'aria-label': 'select all products' },
                      }}
                    />
                  </TableCell>
                  {COLUMNS.map((col) => (
                    <TableCell key={col.id} align={col.align ?? 'left'}>
                      {col.sortable ? (
                        <TableSortLabel
                          active={sortBy === col.id}
                          direction={sortOrder}
                          onClick={() => handleSort(col.id as SortableField)}
                        >
                          {col.label}
                        </TableSortLabel>
                      ) : (
                        col.label
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <SkeletonRows rows={pageSize <= 10 ? pageSize : 10} cols={COLUMNS.length} />
                ) : (
                  items.map((product, index) => (
                    <ProductRow
                      key={product.id}
                      index={index}
                      product={product}
                      selected={selected}
                      setSelected={setSelected}
                    />
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TableFooter>
            <TablePagination
              component='div'
              labelDisplayedRows={({ from, to, count }) => (
                <Box
                  color='textSecondary'
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    gap: 0.8,
                  }}
                >
                  <Typography color='textSecondary'>Показано</Typography>
                  <Typography>
                    {from}–{to}
                  </Typography>
                  <Typography color='textSecondary'>из</Typography>
                  <Typography>{count !== -1 ? count : `больше чем ${to}`}</Typography>
                </Box>
              )}
              count={total}
              page={page}
              rowsPerPage={pageSize}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              rowsPerPageOptions={[]}
              ActionsComponent={CustomPaginationActions}
              sx={{
                width: '100%',
                mr: 6,
                '& .MuiTablePagination-toolbar': {
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: 0,
                },
                '& .MuiTablePagination-spacer': {
                  display: 'none',
                },
                '& .MuiTablePagination-selectLabel, & .MuiTablePagination-select': {
                  display: 'none',
                },
                '& .MuiTablePagination-displayedRows': {
                  marginLeft: 5,
                  fontSize: '18px',
                },
                '& .MuiTablePagination-actions': {
                  marginRight: 'auto',
                },
              }}
            />
          </TableFooter>
        </TableWrapper>
      </TableBox>
      <AddProductDialog open={addOpen} onClose={() => setAddOpen(false)} onAdd={handleAddProduct} />
    </ProductBox>
  )
}

export default ProductPage
