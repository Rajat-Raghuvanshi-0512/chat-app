import React from 'react'
import { Navigate, Outlet } from "react-router-dom"
import { useProfile } from '../context/ProfileContext';
import Loader from './Loader/Loader'

const ProtectedRoutes = () => {
  const { profile, loading } = useProfile()
  if (loading && !profile) {
    return <Loader />
  }

  if (!profile && !loading) {
    return <Navigate to={'/signin'} />
  }
  return (
    <Outlet />
  )
}

export default ProtectedRoutes