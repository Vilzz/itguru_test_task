import { useState } from 'react'
import type { NewProduct } from '../types'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import AddShoppingCart from '@mui/icons-material/AddShoppingCart'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Close from '@mui/icons-material/Close'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import CurrencyRubleIcon from '@mui/icons-material/CurrencyRuble'
import QrCode from '@mui/icons-material/QrCode'
import Storefront from '@mui/icons-material/Storefront'
import { toast } from 'react-toastify'

type AddProductDialogProps = {
  open: boolean
  onClose: () => void
  onAdd: (product: NewProduct) => void
}
const empty: NewProduct = { title: '', price: 0, brand: '', sku: '' }

const AddProductDialog = ({ open, onClose, onAdd }: AddProductDialogProps) => {
  const [form, setForm] = useState<NewProduct>(empty)
  const [errors, setErrors] = useState<Partial<NewProduct>>({})

  const validate = (): boolean => {
    const errs: Partial<NewProduct> = {}
    if (!form.title.trim()) errs.title = 'Требуется наименование продукта'
    if (!form.brand.trim()) errs.brand = 'Требуется наименование бренда'
    if (!form.sku.trim()) errs.sku = 'Требуется артикул'
    if (form.price <= 0) errs.price = 0
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleChange = (field: keyof NewProduct) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = field === 'price' ? Number(e.target.value) : e.target.value
    setForm((prev) => ({ ...prev, [field]: val }))
    if (errors[field] !== undefined) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }
  const handleSubmit = () => {
    if (!validate()) return
    onAdd(form)
    setForm(empty)
    setErrors({})
    toast.success('Новый продукт добавлен!')
  }

  const handleClose = () => {
    setForm(empty)
    setErrors({})
    onClose()
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth='sm' fullWidth>
      <DialogTitle sx={{ pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box
              sx={{
                width: 38,
                height: 38,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #4F46E5, #818CF8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <AddShoppingCart sx={{ color: '#fff', fontSize: 18 }} />
            </Box>
            <Box>
              <Typography variant='h6' sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                Добавить новый продукт
              </Typography>
              <Typography variant='caption' sx={{ color: '#94A3B8' }}>
                Заполни информацию о продукте
              </Typography>
            </Box>
          </Box>
          <IconButton onClick={handleClose} size='small' sx={{ color: '#94A3B8' }}>
            <Close fontSize='small' />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent sx={{ pt: 2 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }} sx={{ pt: 1 }}>
            <TextField
              fullWidth
              label='Наименование продукта *'
              value={form.title}
              onChange={handleChange('title')}
              error={!!errors.title}
              helperText={errors.title as string}
              placeholder='обр.: iPhone 15 Pro'
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label='Цена *'
              type='number'
              value={form.price || ''}
              onChange={handleChange('price')}
              error={errors.price === 0 && form.price <= 0}
              helperText={
                errors.price === 0 && form.price <= 0 ? 'Цена не может быть меньше 0' : ''
              }
              placeholder='0.00'
              slotProps={{
                input: {
                  startAdornment: <CurrencyRubleIcon sx={{ color: '#94A3B8', fontSize: 18 }} />,
                },
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label='Артикул *'
              value={form.sku}
              onChange={handleChange('sku')}
              error={!!errors.sku}
              helperText={errors.sku as string}
              placeholder='обр.: APPLE-IP15-PRO'
              slotProps={{
                input: {
                  startAdornment: <QrCode sx={{ color: '#94A3B8', fontSize: 18 }} />,
                },
              }}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label='Бренд *'
              value={form.brand}
              onChange={handleChange('brand')}
              error={!!errors.brand}
              helperText={errors.brand as string}
              placeholder='обр.: Apple'
              slotProps={{
                input: {
                  startAdornment: <Storefront sx={{ color: '#94A3B8', fontSize: 18 }} />,
                },
              }}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
        <Button
          onClick={handleClose}
          variant='outlined'
          sx={{
            borderColor: '#E2E8F0',
            color: '#64748B',
            '&:hover': { borderColor: '#CBD5E1', background: '#F8FAFC' },
          }}
        >
          Отменить
        </Button>
        <Button onClick={handleSubmit} variant='contained' sx={{ px: 3 }}>
          Добавить продукт
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddProductDialog
