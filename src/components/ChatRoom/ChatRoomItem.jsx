import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import Moment from 'react-moment';

const ChatRoomItem = ({ room }) => {
    const location = useLocation()
    return (
        <Link
            to={`/room/${room.id}`}
            className={`${location.pathname === `/room/${room.id}` ? "border-cyan-500  border-l-4  dark:bg-gray-50 bg-gray-300" : "dark:bg-gray-300"} grid grid-cols-4 mb-3 mx-3 p-2 hover:bg-gray-200 rounded bg-gray-100`}>
            <div className='col-span-3'>
                <h4 className='font-bold text-xl text-slate-700 dark:text-wh w-52 overflow-hidden text-clip'>{room.chatname}</h4>
                <p className='text-sm text-slate-500'>
                    {room.lastMessage
                        ?
                        room.lastMessage.length > 30 ? `${room.lastMessage.slice(0, 30)}...` : room.lastMessage
                        :
                        "No messages yet..."
                    }
                </p>
            </div>
            <div className='text-[0.55rem] text-slate-600 text-right'>
                <Moment fromNow >{room.lastMessageAt ? room.lastMessageAt : room.createdAt}</Moment>
            </div>
        </Link>
    )
}

export default ChatRoomItem