import React from 'react'
import { SafeUser as IUser } from '@/lib/types/database'
import '/resources/styles/components/login/userItem.scss'
import defaultPng from '/resources/images/default-pfp.png'

type UserItemProps = {
  user: IUser,
  onClick: (user: IUser) => void | null,
  notHoverable?: boolean | null,
}

export default function UserItem(userItemProps: UserItemProps) {
  return (
    <div className={'user-item ' + (userItemProps.notHoverable ? 'pointer-events-none cursor-none' : '')} onClick={() => {
      userItemProps.onClick(userItemProps.user)
    }}>
      <img src={userItemProps.user.profilePicture ?? defaultPng} alt="Profile Picture" />
      <p>{userItemProps.user.username}</p>
    </div>
  )
}
