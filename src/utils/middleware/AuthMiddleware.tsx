import { Navigate, Outlet, useLocation } from "react-router-dom";
// import { useEffect, useState } from "react";
import { useData } from "@/lib/hooks/fetch";

export const AuthMiddleware = () => {
  const location = useLocation();

  const user = useData<any>("/api/auth/validate");

  // const [user, setUser] = useState<any>(null);
  // const [loading, setLoading] = useState(true);
  // loading;
  // useEffect(() => {
  //   setLoading(true);
  //   const fetchUser = async () => {
  //     const response = await fetch("/api/auth/validate", {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         mode: "no-cors",
  //       }
  //     });
  //     const data = await response.json();

  //     setUser(data);
  //     setLoading(false);
  //   };

  //   fetchUser();
  // }, []);

  if (!user || user.error && location.pathname === "/") {
    return <Outlet />;
  } else if (user && location.pathname === "/") {
    return <Navigate to="/dashboard" />;
  } else if (!user || user.error && location.pathname !== "/") {
    return <Navigate to="/" />;
  } else {
    return <Outlet />;
  }
};
