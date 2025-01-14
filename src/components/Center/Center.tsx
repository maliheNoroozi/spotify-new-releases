import { ReactNode } from "react"
import { Box } from "@mui/material"

import classes from "./Center.module.css"

interface Props {
  children: ReactNode
}
export function Center({ children }: Props) {
  return <Box className={classes.center}>{children}</Box>
}
