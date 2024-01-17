import React from "react";
import ReactDOM from "react-dom/client";
import "resources/styles/main.scss";
import RoutesProvider from "./RoutesProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RoutesProvider />
  </React.StrictMode>,
);
