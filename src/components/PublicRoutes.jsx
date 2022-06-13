import React from 'react'
import { Navigate, Outlet } from "react-router-dom"
import { useProfile } from '../context/ProfileContext'
import Loader from './Loader/Loader'

const PublicRoutes = () => {

    const { profile, loading } = useProfile()
    if (loading && !profile) {
        return <Loader />
    }

    if (profile && !loading) {
        return <Navigate to={'/'} />
    }
    return (
        <Outlet />
    )
}

export default PublicRoutes