import { set, ref as dbref } from 'firebase/database'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { useRef } from 'react'
import AvatarEditor from 'react-avatar-editor'
import { useProfile } from '../../context/ProfileContext'
import { database, storage } from '../../misc/firebase'
import { toast } from 'react-toastify'

const AvatarModal = ({ isOpen, closeModal, image }) => {
    const { profile } = useProfile()
    const avatarRef = useRef()

    const onUploadClick = () => {
        const avatar = avatarRef.current
        const canvas = avatar.getImageScaledToCanvas()
        const databaseRef = dbref(database, `/profiles/${profile.uid}/avatar`)
        canvas.toBlob(async (blob) => {
            try {
                const avatarFileRef = ref(storage, `/profiles/${profile.uid}/avatar`)
                await uploadBytes(avatarFileRef, blob)
                const url = await getDownloadURL(avatarFileRef)
                await set(databaseRef, url)
                toast.success('Avatar updated successfully')
                closeModal()
            } catch (error) {
                toast.error(error.message)
            }
        })
    }
    return (
        <>
            <div className={`${!isOpen && "hidden"} fixed top-[8vh] lg:left-full w-full max-w-sm md:h-full`}>
                <div className="relative m-4 w-full max-w-sm h-full md:h-auto shadow">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 ">
                        <div className="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Adjust and Upload your avatar
                            </h3>
                        </div>
                        <div className="p-6 flex items-center justify-center">
                            <AvatarEditor
                                image={image}
                                border={10}
                                borderRadius={100}
                                rotate={0}
                                ref={avatarRef}
                            />
                        </div>
                        <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                            <button data-modal-toggle="defaultModal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={onUploadClick}>Upload</button>
                            <button data-modal-toggle="defaultModal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600" onClick={closeModal}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default AvatarModal