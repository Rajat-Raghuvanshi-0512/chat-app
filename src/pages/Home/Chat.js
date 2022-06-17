import React from 'react'
import { useParams } from 'react-router-dom'
import ChatBottom from '../../components/ChatRoom/Chat Window/Bottom'
import ChatMiddle from '../../components/ChatRoom/Chat Window/Middle'
import ChatTop from '../../components/ChatRoom/Chat Window/Top'
import { useRooms } from '../../context/RoomsContext'
import Loader from "../../components/Loader/Loader"
import { ImCross } from "react-icons/im"
import CurrentRoomProvider from '../../context/CurrentRoomContext'

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
    const { chatname, desc } = currentRoom
    const roomData = {
        chatname, desc
    }
    return (
        <CurrentRoomProvider data={roomData}>
            <div className='relative h-screen'>
                <div>
                    <ChatTop />
                </div>
                <div>
                    <ChatMiddle />
                </div>
                <div className='absolute bottom-0 w-full'>
                    <ChatBottom />
                </div>
            </div>
        </CurrentRoomProvider>
    )
}

export default Chat