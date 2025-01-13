import CircularProgress from "@mui/material/CircularProgress"
import Box from "@mui/material/Box"

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
