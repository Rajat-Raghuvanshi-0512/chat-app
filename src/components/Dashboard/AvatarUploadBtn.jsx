import React, { useState } from 'react'
import { useModal } from '../../misc/custom-hooks'
import AvatarModal from './AvatarModal'
import { toast } from 'react-toastify'

function isFileImage(file) {
    return file && file['type'].split('/')[0] === 'image';
}

const AvatarUploadBtn = () => {
    const { isOpen, closeModal, openModal } = useModal()
    const [img, setImg] = useState(null)

    const onFileInputChange = (e) => {
        const files = e.target.files
        if (files.length === 1) {
            const file = files[0]
            if (isFileImage(file)) {
                setImg(file)
                openModal()
            } else {
                toast.error('Please select an image file')
            }
        }
    }

    return (
        <div className='flex flex-col items-center'>
            <div>
                <label htmlFor="fileUpload" className='block cursor-pointer font-semibold dark:text-slate-100 dark:border dark:border-slate-100 px-3 py-2 rounded hover:bg-white hover:text-gray-700'>
                    Add new image
                    <input type="file" name="fileUpload" id="fileUpload" className='hidden' accept="image/*" onChange={onFileInputChange} />
                </label>
            </div>
            <AvatarModal isOpen={isOpen} closeModal={closeModal} image={img} />
        </div>
    )
}

export default AvatarUploadBtn