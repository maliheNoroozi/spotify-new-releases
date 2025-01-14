import React, { useEffect } from "react"
import { Typography } from "@mui/material"
import { fetchAccessToken } from "./authSlice"
import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { Center } from "@/components/Center"
import { Spinner } from "@/components/Spinner"
import { Status } from "@/types"

import classes from "./Auth.module.css"

interface Props {
  children: React.ReactNode
}

export function Auth({ children }: Props) {
  const dispatch = useAppDispatch()
  const { status, error, access_token } = useAppSelector(state => state.auth)

  useEffect(() => {
    if (status === Status.idle) {
      dispatch(fetchAccessToken())
    }
  }, [dispatch, status])

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

    if (status === Status.succeeded && access_token) {
      return <>{children}</>
    }

    return (
      <Center>
        <Typography className={classes.emptyMessage}>
          This is a spotify app
        </Typography>
      </Center>
    )
  }

  return <>{renderContent()}</>
}
