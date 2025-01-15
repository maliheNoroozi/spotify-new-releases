import { useEffect, useState } from "react"
import { Box, Typography } from "@mui/material"
import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { Album } from "@/components/Album"
import { Pagination } from "@/components/Pagination"
import { Spinner } from "@/components/Spinner"
import { Center } from "@/components/Center"
import { Status } from "@/types"
import { fetchNewReleases } from "./newReleasesSlice"

import classes from "./NewReleases.module.css"

const LIMIT = 10

export function NewReleases() {
  const dispatch = useAppDispatch()
  const [currentPage, setCurrentPage] = useState(1)

  const { pages, status, error } = useAppSelector(state => state.newReleases)

  useEffect(() => {
    const offset = (currentPage - 1) * LIMIT
    const shouldFetch =
      status === Status.idle ||
      (status === Status.succeeded && !pages[currentPage])

    if (shouldFetch) {
      dispatch(fetchNewReleases({ limit: LIMIT, offset }))
    }
  }, [dispatch, currentPage, pages, status])

  const renderContent = () => {
    if (status === Status.pending) {
      return (
        <Center>
          <Spinner size={80} color="#808080" />
        </Center>
      )
    }
    if (error) {
      return (
        <Center>
          <Typography variant="h6" className="errorMessage">
            Something went wrong: {error}
          </Typography>
        </Center>
      )
    }
    if (!pages[currentPage]?.length && status === Status.succeeded) {
      return (
        <Center>
          <Typography variant="h6" className={classes.emptyMessage}>
            No new releases available at the moment.
          </Typography>
        </Center>
      )
    }
    return (
      <Box className={classes.albums}>
        {pages[currentPage]?.map(album => (
          <Album key={album.id} album={album} />
        ))}
      </Box>
    )
  }

  return (
    <Box className={classes.container}>
      <Typography variant="h4" align="left" className={classes.header}>
        Spotify New Releases
      </Typography>
      <Box className={classes.content}>{renderContent()}</Box>
      <Pagination onPageChange={setCurrentPage} />
    </Box>
  )
}
