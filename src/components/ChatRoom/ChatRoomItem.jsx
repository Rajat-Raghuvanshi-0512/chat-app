import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import Moment from 'react-moment';
// import 'moment-timezone';

const ChatRoomItem = ({ room }) => {
    const location = useLocation()
    console.log(location.pathname);
    return (
        <Link
            to={`/room/${room.id}`}
            className={`flex justify-between mb-3 mx-3 p-2 border-l-2 hover:bg-gray-200 rounded ${location.pathname === `/room/${room.id}` ? "border-cyan-400 bg-gray-200 border-l-4" : ""}`}>
            <div>
                <h4 className='font-bold text-xl text-slate-700 w-52 overflow-hidden text-clip'>{room.chatname}</h4>
                <p className='text-sm text-slate-500'>{room.desc.length > 30 ? `${room.desc.slice(0, 30)}...` : room.desc}</p>
            </div>
            <div className='text-[0.55rem] text-slate-600'>
                <Moment fromNow >{room.createdAt}</Moment>
            </div>
        </Link>
    )
}

export default ChatRoomItem