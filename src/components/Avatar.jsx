import React from 'react'
import { useState } from 'react'
import Tooltip from './Tooltip'

const Avatar = ({ image, size = 5, status }) => {
    const [open, setOpen] = useState(false)
    return (
        <div className='relative'>
            <img src={image} alt="profile" className={`w-${size} h-${size} rounded-full`} />
            <span className={`bottom-0 left-[70%] absolute w-[30%] h-[30%] ${status === 'online' ? "bg-green-500" : "bg-red-500"} rounded-full border border-slate-200 dark:border-slate-700`} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
                <Tooltip text={status} open={open} />
            </span>
        </div>
    )
}

export default Avatar