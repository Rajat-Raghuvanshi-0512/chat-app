import React from 'react'
import "./Loader.css"

const Loader = () => {
    return (
        <div className='flex justify-center items-center w-full h-screen bg-gray-100'>
            <div className='lds-ring'>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

export default Loader