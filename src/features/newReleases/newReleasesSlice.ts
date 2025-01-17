import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { Album, Status } from "@/types"
import axios from "axios"

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
  totalPages: 0,
}

export const fetchNewReleases = createAsyncThunk<
  { albums: Album[]; total: number },
  { limit: number; offset: number },
  { rejectValue: string }
>(
  "newReleases/fetchNewReleases",
  async (
    { limit, offset }: { limit: number; offset: number },
    { rejectWithValue },
  ) => {
    try {
      const response = await axios(
        `/browse/new-releases?limit=${limit}&offset=${offset}`,
      )

      return {
        albums: response.data.albums.items,
        total: response.data.albums.total,
      }
    } catch (error) {
      return rejectWithValue(
        axios.isAxiosError(error) || error instanceof Error
          ? error.message
          : "An unexpected error occurred while fetching the new releases",
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
  selectors: {
    selectPages: state => state.pages,
    selectStatus: state => state.status,
    selectTotalPages: state => state.totalPages,
    selectError: state => state.error,
  },
})

export const { selectPages, selectTotalPages, selectStatus, selectError } =
  newReleasesSlice.selectors
export default newReleasesSlice.reducer
