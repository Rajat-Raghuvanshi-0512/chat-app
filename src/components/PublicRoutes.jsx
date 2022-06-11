import React from 'react'
import { Navigate, Outlet } from "react-router-dom"

const PublicRoutes = () => {

    const profile = true;

    if (profile) {
        return <Navigate to={'/'} />
    }
    return (
        <Outlet />
    )
}

export default PublicRoutes