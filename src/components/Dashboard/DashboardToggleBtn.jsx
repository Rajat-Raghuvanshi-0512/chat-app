import React from 'react'
import Dashboard from '.'
import { useModal } from '../../misc/custom-hooks'

const DashboardToggleBtn = () => {
    const { isOpen, openModal, closeModal } = useModal()
    return (
        <>
            <button className="bg-sky-400 w-full py-2 rounded-lg text-white hover:bg-sky-500 font-semibold drop-shadow-lg" onClick={openModal}>Dashboard</button>
            <Dashboard isOpen={isOpen} closeModal={closeModal} />
        </>
    )
}

export default DashboardToggleBtn