import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { Status } from "../../types"

const clientId = import.meta.env.VITE_REACT_APP_SPOTIFY_CLIENT_ID
const clientSecret = import.meta.env.VITE_REACT_APP_SPOTIFY_CLIENT_SECRET
const authEndpoint = "https://accounts.spotify.com/api/token"

export interface AuthState {
  access_token: string | null
  expires_in: number | null
  status: Status
  error: string | null
}

const initialState: AuthState = {
  access_token: "",
  expires_in: 0,
  status: Status.idle,
  error: null,
}

export const fetchAccessToken = createAsyncThunk(
  "auth/fetchAccessToken",
  async (_, { rejectWithValue }) => {
    const encodedCredentials = btoa(`${clientId}:${clientSecret}`)

    try {
      const response = await fetch(authEndpoint, {
        method: "POST",
        headers: {
          Authorization: `Basic ${encodedCredentials}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ grant_type: "client_credentials" }),
      })

      if (!response.ok) {
        throw new Error("Failed to fetch access token")
      }

      const data = await response.json()
      return {
        access_token: data.access_token,
        expires_in: data.expires_in,
      }
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error",
      )
    }
  },
)

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAccessToken.pending, state => {
        state.status = Status.pending
      })
      .addCase(
        fetchAccessToken.fulfilled,
        (
          state,
          action: PayloadAction<{ access_token: string; expires_in: number }>,
        ) => {
          state.status = Status.succeeded
          state.access_token = action.payload.access_token
          state.expires_in = action.payload.expires_in
          state.error = null
        },
      )
      .addCase(
        fetchAccessToken.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = Status.failed
          state.error = action.payload || "Failed to fetch access token"
        },
      )
  },
})

export const authReducer = authSlice.reducer
