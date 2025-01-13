import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import { Album, Status } from "../../types"

export interface NewReleasesState {
  pages: Record<number, Album[]>
  status: Status
  error: string | null
  totalPages: number
}

export const initialState: NewReleasesState = {
  pages: {},
  status: Status.idle,
  error: null,
  totalPages: 5,
}

export const fetchNewReleases = createAsyncThunk<
  { albums: Album[]; total: number },
  { limit: number; offset: number },
  { rejectValue: string }
>(
  "newReleases/fetchNewReleases",
  async (
    { limit, offset }: { limit: number; offset: number },
    { getState, rejectWithValue },
  ) => {
    try {
      const state = getState() as RootState
      const { access_token } = state.auth

      if (!access_token) {
        throw new Error("Access token is not available")
      }

      const headers = new Headers()
      headers.append("Authorization", `Bearer ${access_token}`)
      headers.append("Content-Type", "application/json")

      const response = await fetch(
        `https://api.spotify.com/v1/browse/new-releases?limit=${limit}&offset=${offset}`,
        {
          headers,
        },
      )

      if (!response.ok) {
        throw new Error("Failed to fetch new releases")
      }

      const data = await response.json()

      console.log({ data })
      return {
        albums: data.albums.items,
        total: data.albums.total,
      }
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch new releases",
      )
    }
  },
)

export const newReleasesSlice = createSlice({
  name: "newReleases",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchNewReleases.pending, state => {
        state.status = Status.pending
      })
      .addCase(fetchNewReleases.fulfilled, (state, action) => {
        const { albums, total } = action.payload
        const page = action.meta.arg.offset / action.meta.arg.limit + 1
        state.status = Status.succeeded
        state.pages[page] = albums
        state.totalPages = total
      })
      .addCase(fetchNewReleases.rejected, (state, action) => {
        state.status = Status.failed
        state.error =
          action.payload ||
          action.error.message ||
          "Failed to fetch new releases"
      })
  },
})

export default newReleasesSlice.reducer
