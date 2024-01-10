import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import "/resources/styles/components/login/loginForm.scss";
import UserItem from "./UserItem";
import { loginSchema, TLoginSchema } from "@/lib/types/zodSchemes";

export default function LoginForm() {
  const testUser = {
    id: 1,
    username: "test",
    profilePicture: null,
    createdAt: "2021-08-01T00:00:00.000Z",
    updatedAt: "2021-08-01T00:00:00.000Z",
  } as any;

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
      <UserItem user={testUser} onClick={() => {}} notHoverable={true} />
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            placeholder="typ wachtwoord hier"
            type="password"
            {...register("password")}
          />
          {errors.password && <p>{errors.password.message}</p>}
          <button type="submit">&gt;</button>
        </div>
        <a href="">Wachtwoord vergeten?<br />
        </a>
      </form>
    </div>
  );
}
