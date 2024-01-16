import { SafeUser as User } from '@/lib/types/database'
import '/resources/styles/components/login/userItem.scss'
import defaultPng from '/resources/images/default-pfp.png'

type UserItemProps = {
  user: User,
  onClick: ((user: User) => void)| null,
}

export default function UserItem(userItemProps: UserItemProps) {
  return (
    <div className={'user-item ' + (!userItemProps.onClick ? 'pointer-events-none cursor-none' : '')} onClick={() => {
      userItemProps.onClick?.(userItemProps.user)
    }}>
      <img src={userItemProps.user.profile_picture ?? defaultPng} alt="Profile Picture" />
      <p>{userItemProps.user.username}</p>
    </div>
  )
}
