import { AxiosError } from "axios"
import { screen, waitFor } from "@testing-library/dom"
import { renderWithProviders } from "@/utils/test-render-utils"
import { Status } from "@/types"
import { Auth } from "./Auth"
import { authEndpoint } from "./authSlice"
import { mock } from "@/setupTests"
import { mockAxiosResolve } from "@/utils/test-utils"

export const preloadedState = {
  newReleases: {
    pages: {},
    status: Status.idle,
    error: null,
    totalPages: 0,
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
    mockAxiosResolve("POST", authEndpoint, {
      access_token: "mock_access_token",
      expires_in: 12,
    })

    renderAuthWithProviders()

    expect(screen.queryByTestId(/spinner/i)).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.queryByText(/Hello World/i)).toBeInTheDocument()
    })
  })

  test("handles a custom error response", async () => {
    mock.onPost(authEndpoint).reply(() => {
      throw new AxiosError("API error")
    })

    renderAuthWithProviders()

    await waitFor(() => {
      expect(
        screen.queryByText(/something went wrong: api error/i),
      ).toBeInTheDocument()
      expect(screen.queryByText(/Hello World/i)).not.toBeInTheDocument()
    })
  })

  test("handles a 500 error response", async () => {
    mock.onPost(authEndpoint).reply(500)

    renderAuthWithProviders()

    await waitFor(() => {
      expect(
        screen.queryByText(
          /something went wrong: Request failed with status code 500/i,
        ),
      ).toBeInTheDocument()
      expect(screen.queryByText(/Hello World/i)).not.toBeInTheDocument()
    })
  })

  test("handles a network error", async () => {
    mock.onPost(authEndpoint).networkError()

    renderAuthWithProviders()

    await waitFor(() => {
      expect(
        screen.queryByText(/something went wrong: network error/i),
      ).toBeInTheDocument()
      expect(screen.queryByText(/Hello World/i)).not.toBeInTheDocument()
    })
  })

  test("handles a timeout error", async () => {
    mock.onPost(authEndpoint).timeout()

    renderAuthWithProviders()

    await waitFor(() => {
      expect(
        screen.queryByText(/something went wrong: timeout of 0ms exceeded/i),
      ).toBeInTheDocument()
      expect(screen.queryByText(/Hello World/i)).not.toBeInTheDocument()
    })
  })
})
