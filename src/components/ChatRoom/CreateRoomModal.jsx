import { push, ref, serverTimestamp } from 'firebase/database'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { database } from '../../misc/firebase'

const initialData = {
    chatname: "",
    desc: ""
}
const CreateRoomModal = ({ isOpen, closeModal }) => {
    const [formData, setFormData] = useState(initialData)

    const handleInputChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setFormData(prev => {
            return { ...prev, [name]: value }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newRoomdata = {
            ...formData,
            createdAt: serverTimestamp()
        }
        try {
            const DBRef = ref(database, "rooms")
            await push(DBRef, newRoomdata)
            toast.success("Room created")
            closeModal()
        } catch (error) {
            toast.error(error.message)
            closeModal()
        }
        setFormData(initialData)
    }
    return (
        <>
            <div className={`${!isOpen && " scale-0"} fixed w-full top-0 left-0 h-screen`}>
                <div className="relative max-w-sm h-auto shadow bg-slate-100 rounded-lg dark:bg-gray-700 top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] ease-out scale-100">
                    <div className=" p-4 rounded-t border-b dark:border-gray-600">
                        <h3 className="text-2xl text-center font-semibold text-gray-900 dark:text-white">
                            New chat room
                        </h3>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="p-6 ">
                            <label htmlFor="chatname" className='flex flex-col gap-3 dark:text-white'>
                                Room name
                                <input type="text" name="chatname" id="chatname" className='px-2 py-2 outline-none rounded dark:bg-slate-800' placeholder='Enter room name' value={formData.chatname} onChange={handleInputChange} required />
                            </label>
                            <label htmlFor="desc" className='flex flex-col gap-3 mt-5 dark:text-white'>
                                Room description
                                <textarea name="desc" id="desc" className='px-2 py-1 outline-none rounded resize-none dark:bg-slate-800' rows={5} placeholder='Enter room desc' value={formData.desc} onChange={handleInputChange} required />
                            </label>
                        </div>
                        <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"  >Upload</button>
                            <button type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600" onClick={closeModal}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>

        </>
    )
}

export default CreateRoomModal