import React from 'react'
import { useModal } from '../../misc/custom-hooks'
import CreateRoomModal from './CreateRoomModal'

const CreateChatRoomBtn = () => {
    const { isOpen, closeModal, openModal } = useModal()
    return (
        <>
            <button className="bg-green-500 w-full py-2 rounded-lg text-white hover:bg-green-600 font-semibold drop-shadow-lg" onClick={openModal}>Create new chatroom</button>
            <CreateRoomModal isOpen={isOpen} closeModal={closeModal} />
        </>
    )
}

export default CreateChatRoomBtn