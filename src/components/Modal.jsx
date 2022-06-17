
import React from 'react'

const Modal = ({ children, isOpen, closeModal, submitText, onClick, title, closeText }) => {

    return (
        <>
            <div className={`${!isOpen && " scale-0"} fixed w-full top-0 left-0 h-screen z-10 select-none`}>
                <div className="relative max-w-sm h-auto shadow bg-slate-100 rounded-lg dark:bg-gray-700 top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] ease-out scale-100">
                    <div className="p-4 rounded-t border-b dark:border-gray-600">
                        <h3 className="text-2xl text-center font-semibold text-gray-900 dark:text-white">
                            {title}
                        </h3>
                    </div>
                    <div>
                        {children}
                    </div>
                    {closeModal &&
                        <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                            {
                                submitText && onClick &&
                                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700  w-full" onClick={onClick}  >{submitText}</button>
                            }
                            <button type="button" className="text-gray-500 bg-white hover:bg-red-500 hover:text-white focus:outline-none rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5  focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-red-500  w-full" onClick={closeModal}>{closeText ? closeText : "Cancel"}</button>
                        </div>}
                </div>
            </div>

        </>
    )
}

export default Modal