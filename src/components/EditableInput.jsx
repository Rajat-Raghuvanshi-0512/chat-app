import React, { useState } from 'react'
import { MdEdit, MdCheck } from "react-icons/md"

const EditableInput = ({ initialValue, onSave, ...restProps }) => {
    const [value, setValue] = useState(initialValue || "");
    const [isEditing, setIsEditing] = useState(false);
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
        setIsEditing(false);
    }
    return (
        <>
            <div className={`text-base leading-relaxed bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-400 flex w-full rounded items-center px-2 py-3 ${isEditing ? "border-white animate-pulse" : ""}`}>
                <input type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="dark:bg-gray-700 outline-none px-2 w-full bg-white dark:text-gray-300"
                    autoComplete='off'
                    disabled={!isEditing}
                    {...restProps}
                />
                {
                    isEditing ?
                        <button className="inset-y-0  flex items-center px-1 text-white  rounded-r-lg " onClick={saveValue}>
                            <MdCheck className='w-6 h-6 text-black dark:text-white' />
                        </button>
                        :
                        <button className="inset-y-0  flex items-center px-1 text-white  rounded-r-lg" onClick={() => setIsEditing(true)}>
                            <MdEdit className='w-6 h-6 text-black dark:text-white' />
                        </button>
                }
            </div>
        </>
    )
}

export default EditableInput