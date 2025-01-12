import React, { useEffect } from "react"
import { fetchAccessToken } from "./authSlice"
import { useAppDispatch, useAppSelector } from "../../app/hooks"

interface Props {
  children: React.ReactNode
}

const Auth: React.FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch()
  const { status } = useAppSelector(state => state.auth)

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAccessToken())
    }
  }, [dispatch, status])

  if (status === "loading") {
    return <div>Loading...</div>
  }

  if (status === "failed") {
    return <div>Failed to load access token. Please try again later.</div>
  }

  return <>{children}</>
}

export default Auth
