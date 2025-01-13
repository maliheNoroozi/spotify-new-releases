import { Dispatch, SetStateAction } from "react"
import { Pagination, Stack, useMediaQuery, useTheme } from "@mui/material"
import { useAppSelector } from "../app/hooks"

export default function AlbumPagination({
  onPageChange,
}: {
  onPageChange: Dispatch<SetStateAction<number>>
}) {
  const { totalPages } = useAppSelector(state => state.newReleases)

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  return (
    <Stack spacing={2} alignItems="center">
      <Pagination
        count={totalPages}
        shape="rounded"
        siblingCount={0}
        boundaryCount={isMobile ? 0 : 1}
        onChange={(e, value) => onPageChange(value)}
      />
    </Stack>
  )
}
