import { Navigate } from "react-router-dom";
import React from "react";

export const AuthRoute = ({ children }: any) => {
  const user = localStorage.getItem("user");
  if (!user) {
    // user is not authenticated
    return (
      <Navigate
        to="/"
        replace
        state={{
          from: "/dashboard",
        }}
      />
    )
  }
  return (
    <>
      {children}
    </>
  );
};