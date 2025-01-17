import "@testing-library/jest-dom/vitest"
import AxiosMockAdapter from "axios-mock-adapter"
import axios from "axios"

const createMock = () => new AxiosMockAdapter(axios, { delayResponse: 1000 })
export let mock = createMock()

afterEach(() => {
  mock.reset()
})

beforeEach(() => {
  mock = createMock()
})

afterAll(() => {
  mock.restore()
})
