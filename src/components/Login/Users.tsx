import "/resources/styles/components/login/users.scss";
import UserItem from './UserItem';
import { SafeUser as User } from "@lib/types/database";


type UsersProps = {
  users: User[],
  loginActive: boolean,
  setLoginActive: (loginActive: boolean) => void,
  onUserClick: (user: User) => void,
}

export default function Users(usersProps: UsersProps) {
  const { users, loginActive, setLoginActive } = usersProps;
  loginActive
  const handleUserClick = (user: User) => {
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
