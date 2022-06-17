import React, { memo } from 'react'
import { useCurrentRoom } from '../../../../context/CurrentRoomContext'
import { useMediaQuery, useModal } from "../../../../misc/custom-hooks"
import { IoIosArrowBack } from "react-icons/io"
import { useNavigate } from 'react-router-dom'
import RoomInfoModal from './RoomInfoModal'

const Top = () => {
    const name = useCurrentRoom(v => v.chatname)
    const isMobile = useMediaQuery('(max-width: 640px)')
    const Navigate = useNavigate()
    const { isOpen, openModal, closeModal } = useModal()
    return (
        <>
            <div className='flex justify-between'>
                <div className='flex items-center gap-2'>
                    {isMobile &&
                        <IoIosArrowBack className='cursor-pointer w-5 h-5 font-bold' onClick={() => Navigate("/")} />
                    }
                    <h2 className='text-2xl font-bold text-clip'>{name}</h2>
                </div>
                <div>todo</div>
            </div>
            <div className='flex justify-between'>
                <div className='flex items-center '>
                    todo
                </div>
                <button onClick={openModal} className="text-sky-400 hover:text-sky-600 hover:bg-gray-100 px-2 py-1 rounded">Room info</button>
            </div>
            <RoomInfoModal isOpen={isOpen} closeModal={closeModal} />
        </>
    )
}

export default memo(Top)