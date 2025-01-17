import { AxiosError } from "axios"
import { test, vi, expect } from "vitest"
import { screen, waitFor } from "@testing-library/react"
import { renderWithProviders } from "@/utils/test-render-utils"
import { Status } from "@/types"
import { NewReleases } from "./NewReleases"
import { mockAlbums } from "./test-utils"
import { mock } from "@/setupTests"
import { mockAxiosResolve } from "@/utils/test-utils"

const newReleasesEndPoint = "/browse/new-releases?limit=10&offset=0"

const preloadedState = {
  newReleases: {
    pages: {},
    status: Status.idle,
    error: null,
    totalPages: 0,
  },
  auth: {
    access_token: "mock_access_token",
    expires_in: 36000,
    error: null,
    status: Status.succeeded,
  },
}

describe("NewReleases component tests", () => {
  test("renders empty message if no new releases are available", async () => {
    // Mock the API response with an empty releases list
    mockAxiosResolve("GET", newReleasesEndPoint, {
      albums: {
        items: [],
        total: 0,
      },
    })

    renderWithProviders(<NewReleases />, { preloadedState })

    await waitFor(() => {
      expect(
        screen.queryByText(/no new releases available at the moment/i),
      ).toBeInTheDocument()
    })
  })

  test("fetches and renders new releases", async () => {
    // Mock the API response with 2 albums in releases list
    mockAxiosResolve("GET", newReleasesEndPoint, {
      albums: {
        items: mockAlbums,
        total: 2,
      },
    })

    renderWithProviders(<NewReleases />, { preloadedState })

    expect(screen.queryByText(/Spotify New Releases/i)).toBeInTheDocument()
    expect(screen.queryByTestId(/spinner/i)).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.queryByText(mockAlbums[0].name)).toBeInTheDocument()
      expect(screen.queryByText(mockAlbums[1].name)).toBeInTheDocument()
    })

    expect(screen.queryByText(/something went wrong/i)).not.toBeInTheDocument()
  })

  test("does not fetch data if the page is already loaded", async () => {
    const spyOnGet = vi.spyOn(mock, "onGet")

    renderWithProviders(<NewReleases />, {
      preloadedState: {
        ...preloadedState,
        newReleases: {
          pages: { 1: mockAlbums },
          status: Status.succeeded,
          error: null,
          totalPages: 2,
        },
      },
    })

    expect(spyOnGet).not.toHaveBeenCalled()

    expect(screen.queryByText(mockAlbums[0].name)).toBeInTheDocument()
    expect(screen.queryByText(mockAlbums[1].name)).toBeInTheDocument()
  })

  test("displays error message if the API call fails", async () => {
    // Mock the API response with an error
    mock.onGet(newReleasesEndPoint).reply(() => {
      throw new AxiosError("API error")
    })

    renderWithProviders(<NewReleases />, { preloadedState })

    await waitFor(() => {
      expect(
        screen.queryByText(/something went wrong: api error/i),
      ).toBeInTheDocument()
    })
  })
})
