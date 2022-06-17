import React from 'react'
import { useCurrentRoom } from '../../../../context/CurrentRoomContext'
import Modal from '../../../Modal'

const RoomInfoModal = ({ isOpen, closeModal }) => {
    const name = useCurrentRoom(v => v.chatname)
    const desc = useCurrentRoom(v => v.desc)
    return (
        <Modal isOpen={isOpen} closeModal={closeModal} title="Room description" closeText="Close">
            <div className='dark:text-slate-50 p-5'>
                <h4 className=' font-bold py-4 '>Name</h4>
                <p className='text-xl text-clip'>{name}</p>
                <h4 className='font-bold py-4 '>Description</h4>
                <p className='text-xl text-clip'>{desc}</p>
            </div>

        </Modal>
    )
}

export default RoomInfoModal