import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { ProductsState, Product, ProductsResponse } from '../types'
import { BACKENDAPILINK } from './authSlice'

interface FetchProductsParams {
  searchQuery?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  page?: number
  pageSize?: number
}

export const fetchProducts = createAsyncThunk(
  'products/fetchAll',
  async (params: FetchProductsParams, { rejectWithValue }) => {
    try {
      const { searchQuery, sortBy, sortOrder, page = 0, pageSize = 8 } = params
      const skip = page * pageSize
      let url: string
      if (searchQuery && searchQuery.trim()) {
        url = `${BACKENDAPILINK}/products/search?q=${encodeURIComponent(searchQuery)}&limit=${pageSize}&skip=${skip}`
        if (sortBy && sortBy !== 'id') {
          url += `&sortBy=${sortBy}&order=${sortOrder ?? 'asc'}`
        }
      } else {
        url = `${BACKENDAPILINK}/products?limit=${pageSize}&skip=${skip}`
        if (sortBy && sortBy !== 'id') {
          url += `&sortBy=${sortBy}&order=${sortOrder ?? 'asc'}`
        }
      }
      const res = await fetch(url)
      const data = (await res.json()) as ProductsResponse
      if (!res.ok) return rejectWithValue('Не могу получить список продукции')
      return data
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message)
      } else {
        return rejectWithValue('Ошибка сети')
      }
    }
  },
)
export const addProduct = createAsyncThunk(
  'products/add',
  async (product: Partial<Product>, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BACKENDAPILINK}/products/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      })
      const data = (await res.json()) as Product
      if (!res.ok) return rejectWithValue('Не могу добавить продукт')
      return data
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message)
      } else {
        return rejectWithValue('Ошибка сети')
      }
    }
  },
)

const initialState: ProductsState = {
  items: [],
  total: 0,
  loading: false,
  error: null,
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null
    },
    addLocalProduct(state, action: PayloadAction<Product>) {
      state.items.unshift(action.payload)
      state.total += 1
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<ProductsResponse>) => {
        state.loading = false
        state.items = action.payload.products
        state.total = action.payload.total
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(addProduct.pending, (state) => {
        state.loading = false
      })
      .addCase(addProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        state.items.unshift(action.payload)
        state.total += 1
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.error = action.payload as string
      })
  },
})

export const { clearError, addLocalProduct } = productsSlice.actions
export default productsSlice.reducer
