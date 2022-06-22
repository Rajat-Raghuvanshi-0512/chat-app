import { ref, update } from 'firebase/database'
import React, { useState, useEffect } from 'react'
import { useProfile } from '../../context/ProfileContext'
import { database } from '../../misc/firebase'
import EditableInput from '../EditableInput'
import { toast } from "react-toastify"
import ProviderBlock from './ProviderBlock'
import AvatarUploadBtn from './AvatarUploadBtn'
import { MdLightMode, MdDarkMode } from "react-icons/md"
import { getUserUpdates } from '../../misc/helpers'
import Drawer from '../Drawer'

const DashboardToggle = ({ isOpen, closeModal, onSignOut }) => {
    const { profile } = useProfile()
    const [checked, setChecked] = useState(() => {
        return localStorage.getItem("mode") === "dark" ? true : false
    })

    const onSave = async (newdata) => {
        try {
            const updates = getUserUpdates(profile.uid, 'name', newdata, database)
            await update(ref(database), updates)
            toast.success('Saved successfully')
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }

    }
    useEffect(() => {
        if (checked) {
            document.body.className = "dark"
            localStorage.setItem("mode", "dark")
        } else {
            document.body.className = ""
            localStorage.setItem("mode", "light")
        }
    }, [checked])
    return (
        <Drawer isOpen={isOpen} onClose={closeModal} left title={"Dashboard"}>
            <div className="p-6 space-y-6">
                <ProviderBlock />
                <EditableInput
                    initialValue={profile.name}
                    onSave={onSave}
                    id="name"
                />
            </div>
            <div className='my-16 sm:m-0'>
                <div className='flex items-center justify-center mb-5 '>
                    <img src={profile.avatar} alt="" className='w-[150px] sm:w-[110px] rounded-full' />
                </div>
                <AvatarUploadBtn />
            </div>
            <div className="flex justify-between items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600 w-full mt-4 sm:absolute bottom-0">
                <div className='flex items-center gap-2'>
                    <label className="switch">
                        <input type="checkbox" className='input-checkbox' checked={checked} onChange={() => setChecked(!checked)} />
                        <span className="slider round"></span>
                    </label>
                    {
                        checked ? <MdDarkMode className='w-6 h-6 text-white' /> : <MdLightMode className='w-6 h-6 text-gray-700' />
                    }
                </div>
                <button
                    type="button"
                    className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-800"
                    onClick={onSignOut}
                >Logout</button>
            </div>
        </Drawer>
    )
}

export default DashboardToggle