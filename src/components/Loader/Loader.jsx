import React from 'react'
import "./Loader.css"

const Loader = () => {
    return (
        <div className='flex justify-center items-center w-full h-screen bg-transparent'>
            <div className='lds-ring'>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

export default Loader