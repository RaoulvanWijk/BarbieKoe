import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Routes,
} from "react-router-dom";
import Dashboard from "@pages/Dashboard";
import Login from "@pages/Login";
import { AuthMiddleware } from "./utils/middleware/AuthMiddleware";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="/" element={<Login />} />
      {/* <Route path='/dashboard' element={<Dashboard />} /> */}
      <Route
        path="*"
        element={<AuthMiddleware />}
        action={async ({ request }) => {
          return request.headers.getSetCookie();
        }}
      >
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
    </Route>
  )
);
