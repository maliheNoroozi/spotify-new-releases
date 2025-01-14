import { Box, CircularProgress } from "@mui/material"

interface Props {
  size: number
  color: string
}

export function Spinner({ size, color }: Props) {
  return (
    <Box>
      <CircularProgress size={size} sx={{ color }} />
    </Box>
  )
}
