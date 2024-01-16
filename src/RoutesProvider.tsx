import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from '@pages/Dashboard';
import Login from '@pages/Login';
import { AuthRoute } from "./utils/middleware/AuthRoute";


export default function RoutesProvider() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Login />} />
          {/* <Route path='/dashboard' element={<Dashboard />} /> */}
          <AuthRoute>
            <Route path='/dashboard' element={<Dashboard />} />
          </AuthRoute>
      </Routes>
    </BrowserRouter>
  )
}
