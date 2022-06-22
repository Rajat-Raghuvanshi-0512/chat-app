import { ref, update } from 'firebase/database'
import { useState, memo } from 'react'
import { useCurrentRoom } from '../../../../context/CurrentRoomContext'
import { useModal } from '../../../../misc/custom-hooks'
import { database } from '../../../../misc/firebase'
import Drawer from '../../../Drawer'
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { useCallback } from 'react'
import { useEffect } from 'react'

const EditRoomBtn = () => {
    const { isOpen, closeModal, openModal } = useModal()
    const name = useCurrentRoom(s => s.chatname)
    const desc = useCurrentRoom(s => s.desc)
    const { roomId } = useParams()

    const [data, setData] = useState({
        roomtitle: name,
        roomdesc: desc
    })

    const handleChange = useCallback((e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }, [data])

    const onSave = async (e) => {
        e.preventDefault()
        const { roomtitle, roomdesc } = data
        if (roomtitle === name && roomdesc === desc) return;
        const roomRef = ref(database, `rooms/${roomId}`)
        try {
            await update(roomRef, { chatname: roomtitle, desc: roomdesc })
            closeModal()
            toast.success("Updated Successfully")
        } catch (err) {
            closeModal()
            toast.error(err)
        }
    }
    useEffect(() => {
        setData({
            roomtitle: name,
            roomdesc: desc
        })
    }, [name, desc])
    return (
        <>
            <button className=' h-full w-8 p-1 rounded-full bg-orange-600 text-white font-bold' onClick={openModal}>
                A
            </button>
            <Drawer isOpen={isOpen} onClose={closeModal} >
                <div className="p-5">
                    <form onSubmit={onSave} method="post">
                        <div className='mb-3'>
                            <label htmlFor="roomtitle" className='pb-2 block'>Room name</label>
                            <input
                                type='text'
                                value={data.roomtitle}
                                id="roomtitle"
                                name="roomtitle"
                                className='w-full rounded dark:bg-gray-700 outline-none p-3 bg-white dark:text-gray-300'
                                placeholder='Enter room name*'
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='mt-3'>
                            <label htmlFor="roomdesc" className='pb-2 block'>Room description</label>
                            <textarea
                                name="roomdesc"
                                id="roomdesc"
                                cols="30"
                                rows="10"
                                value={data.roomdesc}
                                className='w-full rounded dark:bg-gray-700 outline-none p-3 bg-white dark:text-gray-300 resize-none'
                                placeholder='Enter room description*'
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type='submit' className='bg-green-500 hover:bg-green-600 text-slate-100 font-semibold px-3 py-2 mt-3 rounded-lg text-lg w-full'>Save</button>
                    </form>
                </div>
            </Drawer>

        </>
    )
}

export default memo(EditRoomBtn)