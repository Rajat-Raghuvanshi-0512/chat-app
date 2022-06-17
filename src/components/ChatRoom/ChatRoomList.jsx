import React from 'react'
import { useRooms } from '../../context/RoomsContext'
import ChatRoomItem from './ChatRoomItem'

const ChatRoomList = ({ upperElHeight }) => {
    const { rooms } = useRooms()

    return (
        <div className='overflow-y-auto small-scroll pt-5' style={{ height: `calc(100% - ${upperElHeight}px)` }} >
            {
                rooms.map((room) => (
                    <ChatRoomItem key={room.id} room={room} />
                ))
            }
        </div>
    )
}

export default ChatRoomList