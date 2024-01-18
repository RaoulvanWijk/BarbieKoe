import { Navigate, Route, Routes, Outlet } from "react-router-dom";
import React from "react";

export const AuthMiddleware = () => {
  // console.log("user", children);
  
  // debugger
  if (!user) {
    // user is not authenticated
    return (
      <Routes>
        <Route path="*"
          element={
            <Navigate
              to="/"
            />
          }
        />
      </Routes>
    );
  }
  return <Outlet />;
};
