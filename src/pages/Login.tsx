import { useEffect, useState } from "react";
import "/resources/styles/pages/login.scss";
import logo from "/resources/images/logo.svg";
import Users from "@components/Login/Users";
import LoginForm from "@components/Login/LoginForm";
import Footer from "@/components/Login/Footer";
import { set } from "react-hook-form";

export default function Login() {
  const [loginActive, setLoginActive] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState({
    id: null,
    username: "No user selected",
    profilePicture: null,
    createdAt: "2021-08-01T00:00:00.000Z",
    updatedAt: "2021-08-01T00:00:00.000Z",
  } as any);
  const getUsers = async () => {
    const data = await (await fetch("/api/auth/users")).json();
    return data;
  };

  useEffect(() => {
    (async () => {
      setUsers(await getUsers());
    })()
  }, []);
  return (
    <div className="login-container">
      <img className="logo-absolute" src={logo} alt="Barbiekoe" />
      <div className={"login-content " + (loginActive ? "login-active" : "user-active")}>
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
