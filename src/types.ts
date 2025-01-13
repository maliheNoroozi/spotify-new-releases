export enum Status {
  idle = "idle",
  pending = "pending",
  failed = "failed",
  succeeded = "succeeded",
}

export interface Album {
  id: string
  name: string
  uri: string
  artists: {
    name: string
    id: string
    type: string
    href: string
    uri: string
  }[]
  images: { url: string; height: number; width: number }[]
  release_date: string
  external_urls: { spotify: string }
}
