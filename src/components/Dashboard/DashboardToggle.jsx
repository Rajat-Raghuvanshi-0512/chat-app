import { child, ref, set } from 'firebase/database'
import React, { useState } from 'react'
import { useProfile } from '../../context/ProfileContext'
import { database } from '../../misc/firebase'
import EditableInput from '../EditableInput'
import { toast } from "react-toastify"
import ProviderBlock from './ProviderBlock'

const DashboardToggle = ({ isOpen, closeModal, onSignOut }) => {
    const { profile } = useProfile()
    const [isEditing, setIsEditing] = useState(false);

    const onSave = async (newdata) => {
        const databaseRef = ref(database, `/profiles/${profile.uid}`)
        const childPathRef = child(databaseRef, 'name')
        setIsEditing(false);
        try {
            await set(childPathRef, newdata)
            toast.success('Saved successfully')
        } catch (error) {
            toast.success(error.message)
        }

    }
    return (
        <div className={`${isOpen ? "translate-x-0" : "-translate-x-full"} overflow-y-auto overflow-x-hidden fixed top-0 left-0 z-50 md:inset-0 h-screen md:h-screen transition-all duration-700 w-full sm:w-2/3 md:max-w-lg`}>
            <div className="relative w-full h-full md:h-auto">
                <div className="relative bg-white h-screen shadow dark:bg-gray-700">
                    <div className="flex justify-between items-center p-5 rounded-t border-b dark:border-gray-600">
                        <h3 className="text-2xl font-medium text-gray-900 dark:text-white">
                            Dashboard
                        </h3>
                        <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={closeModal}>
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        </button>
                    </div>
                    <div className="p-6 space-y-6">
                        <ProviderBlock />
                        <EditableInput
                            initialValue={profile.name}
                            onSave={onSave}
                            isEditing={isEditing}
                            setIsEditing={setIsEditing}
                            id="name"
                        />
                    </div>
                    <div className="flex justify-center md:justify-end p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600 w-full absolute bottom-1">
                        <button
                            type="button"
                            className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-800"
                            onClick={onSignOut}
                        >Logout</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardToggle