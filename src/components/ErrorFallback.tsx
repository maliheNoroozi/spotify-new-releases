import { Typography } from "@mui/material"
import { Center } from "@/components/Center"

interface Props {
  errorMessage: string
  errorStatus: number
}

export const ErrorFallback = ({ errorMessage, errorStatus }: Props) => {
  return (
    <Center>
      <Typography variant="h1" className="errorMessage">
        Error {errorStatus}
      </Typography>
      <Typography variant="body1" className="errorMessage">
        {errorMessage}
      </Typography>
    </Center>
  )
}
