import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import "/resources/styles/components/login/loginForm.scss";
import UserItem from "./UserItem";
import { loginSchema, TLoginSchema } from "@/lib/types/zodSchemes";

type LoginFormProps = {
  selectedUser: any;
};

export default function LoginForm(loginFormProps: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: TLoginSchema) => {
    console.log(data);
    
  };

  return (
    <div className="login-form-container">
      <UserItem user={loginFormProps.selectedUser} onClick={null} />
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            placeholder="typ wachtwoord hier"
            type="password"
            {...register("password")}
          />
          <button type="submit">&gt;</button>
        </div>
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        <a href="">Wachtwoord vergeten?<br />
        </a>
      </form>
    </div>
  );
}
