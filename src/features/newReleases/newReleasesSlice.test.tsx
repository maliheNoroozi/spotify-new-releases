import newReleasesReducer, {
  newReleasesSlice,
  fetchNewReleases,
  initialState,
} from "./newReleasesSlice"
import { Status } from "@/types"

const mpockAlbums = [
  { id: "1", name: "test 1" },
  { id: "2", name: "test 2" },
]
const mockTotal = 2
const mockError = "Failed to fetch new releases"

describe("NewReleases reducer sync actions", () => {
  test("should handle initial state", () => {
    expect(
      newReleasesSlice.reducer(undefined, { type: "unknown" }),
    ).toStrictEqual(initialState)
  })

  test('should set status to "pending"', () => {
    const action = { type: fetchNewReleases.pending.type }
    const state = newReleasesReducer(initialState, action)
    expect(state).toEqual({
      ...initialState,
      status: Status.pending,
    })
  })

  test('should set status to "succeeded" when request is finished.', async () => {
    const action = {
      type: fetchNewReleases.fulfilled.type,
      payload: {
        albums: mpockAlbums,
        total: mockTotal,
      },
      meta: {
        arg: {
          offset: 0,
          limit: 2,
        },
      },
    }
    const state = newReleasesReducer(initialState, action)
    expect(state).toEqual({
      ...initialState,
      pages: { 1: mpockAlbums },
      totalPages: mockTotal,
      status: Status.succeeded,
    })
  })

  test('should set status to "failed"', async () => {
    const action = {
      type: fetchNewReleases.rejected.type,
      payload: mockError,
    }
    const state = newReleasesReducer(initialState, action)
    expect(state).toEqual({
      ...initialState,
      error: mockError,
      status: Status.failed,
    })
  })
})
