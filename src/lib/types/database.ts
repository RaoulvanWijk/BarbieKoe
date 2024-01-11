export type SafeUser = {
  id: number,
  username: string,
  profilePicture: string|null,
  createdAt: Date,
  updatedAt: Date,
}

export type User = {
  id: number,
  username: string,
  password: string,
  profilePicture: string|null,
  createdAt: Date,
  updatedAt: Date,
}