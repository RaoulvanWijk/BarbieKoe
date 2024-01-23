import { Navigate, Outlet, useLocation  } from "react-router-dom";
import {useEffect, useState} from "react";

export const AuthMiddleware = () => {
  const location = useLocation();

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchUser = async () => {
      const response = await fetch("/api/auth/validate");
      const data = await response.json();
      
      setUser(data);
      setLoading(false);
    };

    fetchUser();  
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if(!user || user.error && location.pathname === "/") {
    return <Outlet />;
  } else if (user && location.pathname === "/") {
    return <Navigate to="/dashboard" />;
  } else if (!user || user.error && location.pathname !== "/") {
    return <Navigate to="/" />;
  } else {
    return <Outlet />;
  }
};
