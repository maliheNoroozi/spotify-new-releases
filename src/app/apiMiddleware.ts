import { Middleware } from "@reduxjs/toolkit"
import axios from "axios"
import { RootState } from "./store"
import { Status } from "@/types"

export const apiMiddleware: Middleware =
  ({ getState }) =>
  next =>
  (action: any) => {
    const result = next(action)
    if (
      !action.type.startsWith("auth") &&
      action.type.endsWith(`/${Status.pending}`)
    ) {
      const state = getState() as RootState
      const { access_token } = state.auth

      if (!access_token) {
        throw new Error("Access token is not available")
      }

      axios.defaults.baseURL = "https://api.spotify.com/v1"
      axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`
      axios.defaults.headers.common["Content-Type"] = "application/json"
    }

    return result
  }
