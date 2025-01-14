export const mockFetchResolve = <T>(mockResponse: T): void => {
  global.fetch = vi.fn().mockResolvedValueOnce({
    ok: true,
    json: async (): Promise<T> => mockResponse,
  })
}

export const mockFetchReject = (errorMessage: string) => {
  global.fetch = vi.fn().mockRejectedValueOnce(new Error(errorMessage))
}
