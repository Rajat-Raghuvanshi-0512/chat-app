import React, { useEffect, useRef, useState } from 'react'
import ChatRoomList from './ChatRoom/ChatRoomList'
import CreateChatRoomBtn from './ChatRoom/CreateChatRoomBtn'
import DashboardToggleBtn from './Dashboard/DashboardToggleBtn'

const SideBar = () => {
    const ref = useRef();
    const [height, setHeight] = useState()
    useEffect(() => {
        if (ref) {
            setHeight(ref.current.offsetHeight)
        }
    }, [])
    return (
        <>
            <div className='w-screen sm:w-1/2 md:w-1/3 lg:w-1/4 h-screen bg-slate-50'>
                <section ref={ref} className="px-5">
                    <div className="logo flex justify-center items-center gap-3 py-6">
                        <img src="/chat.png" alt="logo" className='w-12 h-12' />
                        <h3 className='font-bold text-3xl'>Chat App</h3>
                    </div>
                    <div className="sidebar-list flex flex-col gap-3 pb-5">
                        <DashboardToggleBtn />
                        <CreateChatRoomBtn />
                    </div>
                    <div className="heading py-3 border-y-2">
                        <h1 className='text-center font-bold opacity-50 uppercase'>Join conversation</h1>
                    </div>
                </section>
                <ChatRoomList upperElHeight={height} />
            </div>
        </>
    )
}

export default SideBar