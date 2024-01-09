import { useState } from "react";
import "/resources/styles/pages/login.scss";
import logo from "/resources/images/logo.svg";
import Users from "@components/Login/Users";
import LoginForm from "@components/Login/LoginForm";
import Footer from "@/components/Login/Footer";

export default function Login() {
  const [loginActive, setLoginActive] = useState(false);

  return (
    <div className="login-container">
      <img className="logo-absolute" src={logo} alt="Barbiekoe" />
      <div className={"login-content " + (loginActive ? "login-active" : "user-active")}>
        <Users
          loginActive={loginActive}
          setLoginActive={setLoginActive}
          users={[]}
        />
        <LoginForm />
      </div>
      <Footer />
    </div>
  );
}
