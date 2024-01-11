import { useEffect, useState } from "react";
import "/resources/styles/pages/login.scss";
import logo from "/resources/images/logo.svg";
import Users from "@components/Login/Users";
import LoginForm from "@components/Login/LoginForm";
import Footer from "@/components/Login/Footer";
import { SafeUser as User } from "@lib/types/database";

import { useData } from "@/lib/hooks/fetch";

export default function Login() {
  const tempUser: User = {
    id: -1,
    username: "No user selected",
    profile_picture: null,
    created_at: new Date("2024-01-11 16:06:36"),
    updated_at: new Date("2024-01-11 16:06:36"),
  };

  const [loginActive, setLoginActive] = useState<boolean>(false);
  const users = useData("/api/auth/users") as User[];
  const [selectedUser, setSelectedUser] = useState<User>(tempUser);
  
  if(!users) return <div>Loading...</div>;

  return (
    <div className="login-container">
      <img className="logo-absolute" src={logo} alt="Barbiekoe" />
      <div
        className={
          "login-content " + (loginActive ? "login-active" : "user-active")
        }
      >
        <Users
          loginActive={loginActive}
          setLoginActive={setLoginActive}
          users={users}
          onUserClick={setSelectedUser}
        />
        <LoginForm selectedUser={selectedUser} />
      </div>
      <Footer loginActive={loginActive} setLoginActive={setLoginActive} />
    </div>
  );
}
