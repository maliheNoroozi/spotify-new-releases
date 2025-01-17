import { Method } from "axios"
import { mock } from "@/setupTests"

export const mockAxiosResolve = <T>(
  method: Method,
  url: string,
  mockResponse: T,
  status: number = 200,
): void => {
  mock.onAny(url).reply(config => {
    if (config.method?.toLowerCase() === method.toLowerCase()) {
      return [status, mockResponse]
    }
    return [404, { error: "Not found" }]
  })
}
