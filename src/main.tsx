import React from "react";
import ReactDOM from "react-dom/client";
import "resources/styles/main.scss";
import { router } from "./RoutesProvider";
import {
  RouterProvider,
} from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} fallbackElement={<div>Loading...</div>} />
    
  </React.StrictMode>,
);
