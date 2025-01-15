import { Dispatch, SetStateAction } from "react"
import {
  Pagination as MuiPagination,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import { useAppSelector } from "@/app/hooks"

interface Props {
  onPageChange: Dispatch<SetStateAction<number>>
}

export function Pagination({ onPageChange }: Props) {
  const { totalPages } = useAppSelector(state => state.newReleases)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  if (totalPages === 0) {
    return null
  }

  return (
    <Stack spacing={2} alignItems="center">
      <MuiPagination
        count={totalPages}
        shape="rounded"
        siblingCount={0}
        boundaryCount={isMobile ? 0 : 1}
        onChange={(e, value) => onPageChange(value)}
      />
    </Stack>
  )
}
