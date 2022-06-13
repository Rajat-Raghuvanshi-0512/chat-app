import React, { useCallback } from 'react'
import { auth } from '../../misc/firebase'
import DashboardToggle from './DashboardToggle'
import { toast } from 'react-toastify'

const Dashboard = ({ closeModal, isOpen }) => {

    const onSignOut = useCallback(async () => {
        closeModal()
        await auth.signOut()
        toast.success('Signed out successfully')
    }, [closeModal])
    return (
        <>
            <DashboardToggle isOpen={isOpen} closeModal={closeModal} onSignOut={onSignOut} />
        </>
    )
}

export default Dashboard