import React from 'react'
import "/resources/styles/components/login/users.scss";
import UserItem from './UserItem';

type UsersProps = {
  users: any[],
  loginActive: boolean,
  setLoginActive: (loginActive: boolean) => void,
  onUserClick: (user: any) => void,
}

export default function Users(usersProps: UsersProps) {
  const { users, loginActive, setLoginActive } = usersProps;

  const handleUserClick = (user: any) => {
    console.log(user);
    setLoginActive(true);
    usersProps.onUserClick(user);
  }
  return (
    <div className='login-users-container'>
      {
        users.map(user => (
          <UserItem key={user.id} user={user} onClick={handleUserClick} />
        ))
      }
    </div>
  )
}
