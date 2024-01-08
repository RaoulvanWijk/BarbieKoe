import React from 'react'
import { SafeUser as IUser } from '@/lib/types/database'
import '/resources/styles/components/login/userItem.scss'
import defaultPng from '/resources/images/default-pfp.png'

type UserItemProps = {
  user: IUser,
  onClick: (user: IUser) => void | null,
}

export default function UserItem(userItemProps: UserItemProps) {
  return (
    <div onClick={() => {
      userItemProps.onClick(userItemProps.user)
    }}>
      <img src={userItemProps.user.profilePicture ?? defaultPng} alt="Profile Picture" />
      <div>{userItemProps.user.username}</div>
    </div>
  )
}
