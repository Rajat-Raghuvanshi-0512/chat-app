import React, { useCallback } from 'react'
import { auth, database } from '../../misc/firebase'
import DashboardToggle from './DashboardToggle'
import { toast } from 'react-toastify'
import { ref, set } from 'firebase/database'
import { isOfflineForDatabase } from '../../context/ProfileContext'
import { useNavigate } from 'react-router-dom'

const Dashboard = ({ closeModal, isOpen }) => {
    const Navigate = useNavigate()
    const onSignOut = useCallback(async () => {
        const userStatusRef = ref(database, `/status/${auth.currentUser.uid}`);
        closeModal()
        Navigate("/")
        await set(userStatusRef, isOfflineForDatabase)
        await auth.signOut()
        toast.success('Signed out successfully')
    }, [closeModal, Navigate])
    return (
        <>
            <DashboardToggle isOpen={isOpen} closeModal={closeModal} onSignOut={onSignOut} />
        </>
    )
}

export default Dashboard