import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import type { AuthState, LoginPayload, User } from '../types'

const TOKEN_KEY = 'itguru_token'
const REFRESH_TOKEN_KEY = 'itguru_refresh_token'
const SESSION_TOKEN_KEY = 'itguru_session_token'
export const BACKENDAPILINK = 'https://dummyjson.com'

type UserWithTokenData = User & {
  rememberMe: boolean
  accessToken: string
  refreshToken: string
}

function getStoredToken(): string | null {
  return localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(SESSION_TOKEN_KEY)
}
function getStoredRefreshToken(): string | null {
  return localStorage.getItem(REFRESH_TOKEN_KEY)
}
const initialState: AuthState = {
  user: null,
  token: getStoredToken(),
  refreshToken: getStoredRefreshToken(),
  loading: false,
  error: null,
  rememberMe: !!localStorage.getItem(TOKEN_KEY),
}

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ username, password, rememberMe }: LoginPayload, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BACKENDAPILINK}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, expiresInMins: 60 }),
        //credentials: 'include',
      })
      const data = (await res.json()) as Record<string, unknown>
      if (!res.ok) {
        return rejectWithValue((data.message as string) || 'Ошибка авторизации')
      }
      if (rememberMe) {
        localStorage.setItem(TOKEN_KEY, data.accessToken as string)
        localStorage.setItem(REFRESH_TOKEN_KEY, data.refreshToken as string)
      } else {
        sessionStorage.setItem(SESSION_TOKEN_KEY, data.accessToken as string)
      }
      return { ...data, rememberMe } as UserWithTokenData
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message)
      }
      return rejectWithValue('Ошибка сети. Попробуйте снова.')
    }
  },
)

export const fetchCurrentUser = createAsyncThunk(
  'auth/fetchCurrentUser',
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as { auth: AuthState }
    const token = state.auth.token
    if (!token) return rejectWithValue('Отсутствует токен авторизации')
    try {
      const res = await fetch(`${BACKENDAPILINK}/auth/me`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
        //credentials: 'include',
      })
      const data = (await res.json()) as Record<string, unknown>
      if (!res.ok) return rejectWithValue(data.message as string)
      return data as unknown as User
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message)
      }
      return rejectWithValue('Нет такого пользователя')
    }
  },
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null
      state.token = null
      state.refreshToken = null
      state.error = null
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem(REFRESH_TOKEN_KEY)
      sessionStorage.removeItem(SESSION_TOKEN_KEY)
    },
    clearError(state) {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<UserWithTokenData>) => {
        state.loading = false
        state.token = action.payload.accessToken
        state.refreshToken = action.payload.refreshToken
        state.rememberMe = action.payload.rememberMe
        state.user = {
          id: action.payload.id,
          username: action.payload.username,
          email: action.payload.email,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          gender: action.payload.gender,
          image: action.payload.image,
          token: action.payload.accessToken,
          refreshToken: action.payload.refreshToken,
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.token = null
        state.user = null
        localStorage.removeItem(TOKEN_KEY)
        sessionStorage.removeItem(SESSION_TOKEN_KEY)
      })
  },
})
export const { logout, clearError } = authSlice.actions
export default authSlice.reducer
