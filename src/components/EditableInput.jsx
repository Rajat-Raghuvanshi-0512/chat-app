import React, { useState } from 'react'
import { MdEdit, MdCheck } from "react-icons/md"

const EditableInput = ({ initialValue, onSave, isEditing, setIsEditing, ...restProps }) => {
    const [value, setValue] = useState(initialValue);
    const saveValue = async () => {
        if (value === "") {
            setValue(initialValue);
            setIsEditing(false);
            return;
        }
        if (value === initialValue) {
            setIsEditing(false);
            return;
        }
        await onSave(value);
    }
    return (
        <>
            <div className={`text-base leading-relaxed bg-gray-800 text-gray-500 dark:text-gray-400 flex w-full rounded items-center px-2 py-3 ${isEditing ? "border-white animate-pulse" : ""}`}>
                <div>Hey, </div>
                <input type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="bg-gray-800 outline-none px-2 w-full"
                    autoComplete='off'
                    disabled={!isEditing}
                    {...restProps}
                />
                {
                    isEditing ?
                        <button className="inset-y-0  flex items-center px-1 text-white  rounded-r-lg " onClick={saveValue}>
                            <MdCheck className='w-6 h-6 text-white' />
                        </button>
                        :
                        <button className="inset-y-0  flex items-center px-1 text-white  rounded-r-lg" onClick={() => setIsEditing(true)}>
                            <MdEdit className='w-6 h-6 text-white' />
                        </button>
                }
            </div>
        </>
    )
}

export default EditableInput