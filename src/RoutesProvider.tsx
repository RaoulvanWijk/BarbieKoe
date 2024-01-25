import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import { AuthMiddleware } from "./utils/middleware/AuthMiddleware";
import Dashboard from "@pages/Dashboard";
import Login from "@pages/Login";
import Places from "@pages/Places";

import Reservations from "@pages/Reservations";
import Reservation from "./pages/Reservation";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="*" element={<AuthMiddleware />}>
      <Route path="" element={<Login />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="reservations" element={<Reservations />} />
      <Route path="reservations/:id" element={<Reservation />} />
      <Route path="plaatsen" element={<Places />} />
    </Route>
  )
);
