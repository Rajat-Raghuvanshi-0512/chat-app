import React from 'react'
import Moment from 'react-moment';
import { auth } from '../../../../misc/firebase';
import Avatar from '../../../Avatar';
import UserInfoBtn from './UserInfoBtn';
import { BsHeartFill } from "react-icons/bs"
import { useHover, usePresence } from '../../../../misc/custom-hooks';
import { useCurrentRoom } from '../../../../context/CurrentRoomContext';
import { ImCross } from "react-icons/im"
import Modal from '../../../Modal';
const MessageItem = ({ msg, handleLike, handleDelete }) => {

    const { message, file, user, likes, likesCount, createdAt } = msg;
    const [ref, onHover] = useHover()
    const isLiked = likes && likes[auth.currentUser.uid]
    const presence = usePresence(user.userId)

    const admins = useCurrentRoom(s => s.admins)
    const isAdmin = useCurrentRoom(s => s.isAdmin)

    const isMsgUserAdmin = admins.includes(user.userId)
    const isCurrentUserMsg = auth.currentUser.uid === user.userId
    const canGrantAdmin = !isCurrentUserMsg && isAdmin

    const renderFile = (file) => {
        // console.log(file);
        if (file.contentType.includes("image")) {
            return <>
                <img src={file.url} alt="pic" className='w-[20vw]' />
                <Modal>

                </Modal>
            </>

        }
        return <a href={file.url} className="text-slate-500">Download <span className="text-blue-600">{file.name}</span></a>
    }

    return (
        <li className={`my-3 bg-gray-100 w-fit px-3 py-2 rounded-tr-2xl rounded-bl-2xl cursor-default min-w-[100px] ${isCurrentUserMsg && "ml-auto"}`} onDoubleClick={() => handleLike(msg.id)}
            ref={ref}>
            <div className='flex items-center text-xs gap-3 text-gray-500 font-semibold select-none relative'>
                <Avatar image={user.avatar} status={presence} />
                <UserInfoBtn user={user} isMsgUserAdmin={isMsgUserAdmin} canGrantAdmin={canGrantAdmin} />
                {
                    (likesCount !== 0 || onHover) &&
                    <div className={`relative ml-auto ${isCurrentUserMsg ? "mr-5" : "mr-2"}  cursor-pointer`} onClick={() => handleLike(msg.id)}>
                        <BsHeartFill className={`transition-none w-4 h-4 ${isLiked ? "text-red-500" : "text-gray-400"}`} />
                        <span className='absolute w-[80%] h-[80%] -top-1 text-white bg-red-700 rounded-full -right-2 flex items-center justify-center text-[0.5rem]'>{likesCount}</span>
                    </div>
                }
                {
                    isCurrentUserMsg &&
                    <div className='absolute right-0 cursor-pointer' onClick={() => handleDelete(msg.id)}>
                        <ImCross className='w-2 h-2' />
                    </div>
                }
            </div>
            <div className='pt-2'>
                <span>{message ? message : renderFile(file)}</span>
                <sub className='text-[0.6rem] pl-3 text-gray-500 font-semibold select-none'>
                    <Moment format="hh:mm A" trim >{createdAt}</Moment>
                </sub>
            </div>
        </li>
    )
}

export default MessageItem