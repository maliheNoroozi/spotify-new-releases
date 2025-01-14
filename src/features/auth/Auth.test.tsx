import { screen, waitFor } from "@testing-library/dom"
import { renderWithProviders } from "@/utils/test-render-utils"
import { mockFetchReject, mockFetchResolve } from "@/utils/test-utils"
import { Status } from "@/types"
import { Auth } from "./Auth"

export const preloadedState = {
  newReleases: {
    pages: {},
    status: Status.idle,
    error: null,
    totalPages: 5,
  },
  auth: {
    access_token: "",
    expires_in: 0,
    status: Status.idle,
    error: null,
  },
}

const renderAuthWithProviders = () => {
  renderWithProviders(
    <Auth>
      <div>Hello World</div>
    </Auth>,
    {
      preloadedState,
    },
  )
}

describe("Auth component tests", () => {
  test("fetches access_token and renders its children", async () => {
    mockFetchResolve({ access_token: "mock_access_token", expires_in: 12 })

    renderAuthWithProviders()

    expect(screen.queryByTestId(/spinner/i)).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.queryByText(/Hello World/i)).toBeInTheDocument()
    })
  })

  test("displays error message if the API call fails", async () => {
    // Mock the API response with an error
    mockFetchReject("API error")

    renderAuthWithProviders()

    await waitFor(() => {
      expect(
        screen.queryByText(/something went wrong: api error/i),
      ).toBeInTheDocument()
      expect(screen.queryByText(/Hello World/i)).not.toBeInTheDocument()
    })
  })
})
