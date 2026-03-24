export interface User {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  gender: string
  image: string
  token: string
  refreshToken: string
}
export interface AuthState {
  user: User | null
  token: string | null
  refreshToken: string | null
  loading: boolean
  error: string | null
  rememberMe: boolean
}
export interface LoginPayload {
  username: string
  password: string
  rememberMe: boolean
}

export interface Product {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand: string
  category: string
  thumbnail: string
  images: string[]
  sku: string
  availabilityStatus: string
  minimumOrderQuantity: number
  meta: {
    createdAt: string
    updatedAt: string
    barcode: string
    qrCode: string
  }
  dimensions: {
    width: number
    height: number
    depth: number
  }
  warrantyInformation: string
  shippingInformation: string
  returnPolicy: string
  tags: string[]
  weight: number
}

export interface ProductsResponse {
  products: Product[]
  total: number
  skip: number
  limit: number
}

export interface ProductsState {
  items: Product[]
  total: number
  loading: boolean
  error: string | null
}

export interface NewProduct {
  title: string
  price: number
  brand: string
  sku: string
  category?: string
  description?: string
  stock?: number
}

export type Order = 'asc' | 'desc'
export type SortableField = 'title' | 'sku' | 'brand' | 'price' | 'rating'
export interface Column {
  id: SortableField | 'actions'
  label: string
  sortable: boolean
  width?: string | number
  align?: 'left' | 'right' | 'center'
}
