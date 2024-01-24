import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { AuthMiddleware } from "./utils/middleware/AuthMiddleware";
import Dashboard from "@pages/Dashboard";
import Login from "@pages/Login";
import Reservations from "@pages/Reservations";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="*" element={<AuthMiddleware />}>
      <Route path="" element={<Login />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="reservations" element={<Reservations />} />
    </Route>
  )
);
