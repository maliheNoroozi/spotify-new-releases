import { Typography } from "@mui/material"
import { Center } from "./Center/Center"

interface Props {
  errorMessage: string
  errorStatus: number
}

export const ErrorFallback = ({ errorMessage, errorStatus }: Props) => {
  return (
    <Center>
      <Typography variant="h1">Error {errorStatus}</Typography>
      <Typography variant="body1">{errorMessage}</Typography>
    </Center>
  )
}
