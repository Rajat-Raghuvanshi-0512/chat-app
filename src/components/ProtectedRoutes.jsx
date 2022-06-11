import React from 'react'
import { Navigate, Outlet } from "react-router-dom"

const ProtectedRoutes = () => {

  const profile = true;

  if (!profile) {
    return <Navigate to={'/signin'} />
  }
  return (
    <Outlet />
  )
}

export default ProtectedRoutes