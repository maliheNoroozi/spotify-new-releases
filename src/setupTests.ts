import "@testing-library/jest-dom/vitest"
import AxiosMockAdapter from "axios-mock-adapter"
import axios from "axios"

export let mock: AxiosMockAdapter

const setupMockAxios = () => {
  mock = new AxiosMockAdapter(axios, { delayResponse: 1000 })
  return mock
}

beforeEach(() => {
  mock = setupMockAxios()
})

afterAll(() => {
  if (mock) {
    mock.reset()
  }
})

export const mockAxiosGetResolve = <T>(url: string, mockResponse: T): void => {
  mock.onGet(url).reply(200, mockResponse)
}

export const mockAxiosPostResolve = <T>(url: string, mockResponse: T): void => {
  mock.onPost(url).reply(200, mockResponse)
}
