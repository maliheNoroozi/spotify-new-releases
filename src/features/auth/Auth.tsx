import React, { useEffect } from "react"
import { fetchAccessToken } from "./authSlice"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { Center } from "../../components/Center/Center"
import { Status } from "../../types"
import { Spinner } from "../../components/Spinner"

interface Props {
  children: React.ReactNode
}

export function Auth({ children }: Props) {
  const dispatch = useAppDispatch()
  const { status } = useAppSelector(state => state.auth)

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAccessToken())
    }
  }, [dispatch, status])

  if (status === Status.pending) {
    return (
      <Center>
        <Spinner size={80} color="#808080" />
      </Center>
    )
  }

  if (status === "failed") {
    return (
      <Center>
        Failed to load access token and login. Please try refreshing.
      </Center>
    )
  }

  if (status === "succeeded") {
    return <>{children}</>
  }

  return <Center>This is a spotify app</Center>
}
