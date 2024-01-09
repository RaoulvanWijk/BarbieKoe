import React from 'react'
import "/resources/styles/components/login/users.scss";
import UserItem from './UserItem';

type UsersProps = {
  users: any[],
  loginActive: boolean,
  setLoginActive: (loginActive: boolean) => void,
}

export default function Users(usersProps: UsersProps) {
  const { users, loginActive, setLoginActive } = usersProps;

  const testUser = {
    id: 1,
    username: 'test',
    profilePicture: null,
    createdAt: '2021-08-01T00:00:00.000Z',
    updatedAt: '2021-08-01T00:00:00.000Z',
  } as any;

  const handleUserClick = (user: any) => {
    console.log(user);
    setLoginActive(true);
  }
  return (
    <div className='login-users-container'>
      {
        users.map(user => (
          <UserItem key={user.id} user={user} onClick={handleUserClick} />
        ))
      }
      <UserItem user={testUser} onClick={handleUserClick} />
      <UserItem user={testUser} onClick={handleUserClick} />
      <UserItem user={testUser} onClick={handleUserClick} />
      <UserItem user={testUser} onClick={handleUserClick} />
      <UserItem user={testUser} onClick={handleUserClick} />
    </div>
  )
}
