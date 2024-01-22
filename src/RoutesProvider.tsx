import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Dashboard from "@pages/Dashboard";
import Login from "@pages/Login";
import { AuthMiddleware } from "./utils/middleware/AuthMiddleware";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="*" element={<AuthMiddleware />}>
      <Route path="" element={<Login />} />
      <Route path="dashboard" element={<Dashboard />} />
    </Route>
  )
);
