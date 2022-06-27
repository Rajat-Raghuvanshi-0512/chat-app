import React from 'react'
import { useParams } from 'react-router-dom'
import ChatBottom from '../../components/ChatRoom/Chat Window/Bottom'
import ChatMiddle from '../../components/ChatRoom/Chat Window/Middle'
import ChatTop from '../../components/ChatRoom/Chat Window/Top'
import { useRooms } from '../../context/RoomsContext'
import Loader from "../../components/Loader/Loader"
import { ImCross } from "react-icons/im"
import CurrentRoomProvider from '../../context/CurrentRoomContext'
import { memo } from 'react'
import { auth } from '../../misc/firebase'

const Chat = () => {
    const { roomId } = useParams()
    const { rooms } = useRooms()

    if (!rooms) {
        return <Loader />
    }

    const currentRoom = rooms.find(room => room.id === roomId)
    if (!currentRoom) {
        return <Loader />
    }

    if (currentRoom === false) {
        return <div className='flex h-screen items-center justify-center flex-col gap-5 text-red-600'>
            <ImCross className='w-14 h-14' />
            <h5 className='text-center w-full text-2xl font-bold uppercase drop-shadow'>No such Chatroom exists!</h5>
        </div>
    }
    const { chatname, desc, admins } = currentRoom
    const adminsArray = admins ? Object.keys(admins) : [];
    const isAdmin = adminsArray.includes(auth.currentUser.uid)
    const roomData = {
        chatname, desc, admins: adminsArray, isAdmin
    }
    return (
        <CurrentRoomProvider data={roomData}>
            <div className='h-full sm:h-screen overflow-y-hidden'>
                <div className='px-5 py-2 dark:text-slate-100 dark:bg-gray-700 shadow flex flex-col justify-center fixed bg-white z-10 sm:static w-full'>
                    <ChatTop />
                </div>
                <div className='sm:h-[74vh] pt-[10vh] pb-[10vh] sm:pb-0 sm:pt-0 dark:bg-gray-300'>
                    <ChatMiddle />
                </div>
                <div className='dark:bg-gray-700 flex flex-col justify-center items-center shadow-2xl fixed bottom-0 w-full bg-white sm:static'>
                    <ChatBottom />
                </div>
            </div>
        </CurrentRoomProvider>
    )
}

export default memo(Chat)