import React from 'react'
import { useModal } from '../misc/custom-hooks'
import Dashboard from './Dashboard'

const SideBar = () => {
    const { isOpen, openModal, closeModal } = useModal()
    return (
        <>
            <div className='w-screen sm:w-1/2 md:w-1/3 lg:w-1/4 h-screen px-5 bg-slate-50'>
                <div className="logo flex justify-center items-center gap-3 py-6">
                    <img src="/chat.png" alt="logo" className='w-12 h-12' />
                    <h3 className='font-bold text-3xl'>Chat App</h3>
                </div>
                <div className="sidebar-list flex flex-col gap-3">
                    <button className="bg-sky-400 w-full py-2 rounded-lg text-white hover:bg-sky-500 font-semibold drop-shadow-lg" onClick={openModal}>Dashboard</button>
                    <button className="bg-green-500 w-full py-2 rounded-lg text-white hover:bg-green-600 font-semibold drop-shadow-lg">Create new chatroom</button>
                </div>
            </div>
            <Dashboard isOpen={isOpen} closeModal={closeModal} />
        </>
    )
}

export default SideBar