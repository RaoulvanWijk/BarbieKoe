import { basename } from '@tauri-apps/api/path';
import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from './App';
import Dashboard from './pages/Dashboard';


export default function RoutesProvider() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<App />} />
          <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}
