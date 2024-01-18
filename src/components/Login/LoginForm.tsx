import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import "/resources/styles/components/login/loginForm.scss";
import UserItem from "./UserItem";
import { loginSchema, TLoginSchema } from "@/lib/types/zodSchemes";
import { SafeUser } from "@/lib/types/database";

// import react redirect to redirect to home page after login
import { useNavigate   } from "react-router";

type LoginFormProps = {
  selectedUser: SafeUser;
};

export default function LoginForm(loginFormProps: LoginFormProps) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: TLoginSchema) => {
    console.log(data);
    const response = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        user_id: loginFormProps.selectedUser.id,
        password: data.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    if(!response.ok) {
      setError("password", {
        type: "manual",
        message: "Wachtwoord is onjuist"
      })
    } else {
      navigate("/dashboard");
    }

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
