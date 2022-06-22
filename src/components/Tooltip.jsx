import React from 'react'

const Tooltip = ({ text = "Offline", open }) => {
    return (
        <div className={`${!open && "invisible opacity-0"} -top-10 left-0 absolute z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm transition-opacity duration-300 tooltip dark:bg-gray-700`} >
            {text}
        </div>
    )
}

export default Tooltip