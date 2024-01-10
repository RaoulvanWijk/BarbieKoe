import React from 'react'
import "/resources/styles/components/login/loginForm.scss";
import UserItem from './UserItem';

export default function LoginForm() {
  const testUser = {
    id: 1,
    username: 'test',
    profilePicture: null,
    createdAt: '2021-08-01T00:00:00.000Z',
    updatedAt: '2021-08-01T00:00:00.000Z',
  } as any;

  return (
    <div className='login-form-container'>
      <UserItem user={testUser} onClick={() => {}} notHoverable={true} />
      <form className='login-form' action="">
        <div>
          <input placeholder='typ wachtwoord hier' type="password" name="" id="" />
          <button type="submit">&gt;</button>
        </div>
        <a href="">Wachtwoord vergeten?</a>
      </form>
      </div>
  )
}
