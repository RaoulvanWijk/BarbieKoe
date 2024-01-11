export type SafeUser = {
  id: number,
  username: string,
  profile_picture: string|null,
  created_at: Date,
  updated_at: Date,
}

export type User = {
  id: number,
  username: string,
  password: string,
  profile_picture: string|null,
  created_at: Date,
  updated_at: Date,
}

export type Session = {
  id: number,
  userId: number,
  token: string,
  createdAt: Date,
  updatedAt: Date,
}

export type UserSession = {
  id: number,
  username: string,
  profile_picture: string|null,
  created_at: Date,
  updated_at: Date,
  token: string,
}

