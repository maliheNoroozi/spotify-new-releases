import { test, expect } from "vitest"
import { render, screen, within } from "@testing-library/react"
import { Album } from "./Album"
import { formatDateByLocale } from "@/utils/format-time"
import { mockAlbums } from "@/features/newReleases/test-utils"

const album = mockAlbums[0]

describe("Album component tests", () => {
  test("renders the album correctly", async () => {
    render(<Album album={album} />)

    // Test album name link
    const albumNameLink = screen.queryByRole("link", { name: album.name })
    expect(albumNameLink).toBeInTheDocument()
    expect(albumNameLink).toHaveAttribute("href", album.uri)

    // Test album image
    const albumImage = screen.queryByRole("img")
    expect(albumImage).toBeInTheDocument()
    expect(albumImage).toHaveAttribute("src", album.images[0].url)
    expect(albumImage).toHaveAttribute("alt", album.name)

    // // Test artists' links
    const artistsElement = screen.queryByTestId("album-artists")
    expect(artistsElement).toBeInTheDocument()
    const artistLinks = within(artistsElement!).queryAllByRole("link")
    expect(artistLinks).toHaveLength(album.artists.length)
    const artistNames = album.artists.map(artist => artist.name).join(", ")
    expect(artistsElement).toHaveTextContent(artistNames)

    // Test release date
    const releaseDateText = `Release Date: ${formatDateByLocale(album.release_date)}`
    const releaseDate = screen.queryByText(releaseDateText)
    expect(releaseDate).toBeInTheDocument()
  })

  test("handles missing album image gracefully", () => {
    const albumWithNoImage = { ...album, images: [] }
    render(<Album album={albumWithNoImage} />)

    const albumImage = screen.queryByRole("img")
    expect(albumImage).toBeInTheDocument()
    expect(albumImage).toHaveAttribute("alt", album.name)
    expect(albumImage).not.toHaveAttribute("src")
  })

  test("handles missing artists gracefully", () => {
    const albumWithNoArtists = { ...album, artists: [] }
    render(<Album album={albumWithNoArtists} />)

    const artistsElement = screen.queryByTestId("album-artists")
    expect(artistsElement).toBeEmptyDOMElement()
  })
})
