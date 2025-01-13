import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { fetchNewReleases } from "./newReleasesSlice"
import Album from "../../components/Album/Album"
import { Box, Typography } from "@mui/material"
import AlbumPagination from "../../components/AlbumPagination"
import { Spinner } from "../../components/Spinner"
import { Center } from "../../components/Center/Center"
import { Status } from "../../types"

import classes from "./NewReleases.module.css"

const LIMIT = 10

export function NewReleases() {
  const dispatch = useAppDispatch()
  const [currentPage, setCurrentPage] = useState(1)

  const { pages, status, error } = useAppSelector(state => state.newReleases)

  useEffect(() => {
    const offset = (currentPage - 1) * LIMIT
    const canFetchNewReleases =
      status !== Status.pending &&
      status !== Status.failed &&
      pages[currentPage] === undefined
    if (canFetchNewReleases) {
      dispatch(fetchNewReleases({ limit: LIMIT, offset }))
    }
  }, [dispatch, status, currentPage, pages])

  let content = null
  if (status === Status.pending) {
    content = (
      <Center>
        <Spinner size={80} color="#808080" />
      </Center>
    )
  } else if (!!error) {
    content = <Center>Error: {error}</Center>
  } else if (!pages[currentPage]?.length && status === "succeeded") {
    content = <Center>No new releases available.</Center>
  } else {
    content = (
      <Box className={classes.albums}>
        {pages[currentPage]?.map(album => (
          <Album key={album.id} album={album} />
        ))}
      </Box>
    )
  }

  return (
    <Box className={classes.container}>
      <Typography>Hello World</Typography>
      <Box className={classes.content}>{content}</Box>
      <AlbumPagination onPageChange={setCurrentPage} />
    </Box>
  )
}
