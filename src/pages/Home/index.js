import { useLocation } from 'react-router-dom'
import Sidebar from '../../components/Sidebar'
import { useMediaQuery } from '../../misc/custom-hooks'
import Chat from './Chat'
import { IoChatbubblesSharp } from "react-icons/io5"
import RoomsProvider from '../../context/RoomsContext'

const Home = () => {
    const { pathname } = useLocation()
    const isMobile = useMediaQuery("(max-width: 639px)")
    return (
        <RoomsProvider>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-4 overflow-hidden">
                <div className={`${pathname !== "/" && "hidden"} sm:block md:col-span-2 lg:col-span-1 h-screen bg-slate-50 dark:bg-slate-800 dark:border-r border-gray-900 px-3`}>
                    <Sidebar />
                </div>
                <div className={`md:col-span-3 lg:col-span-3`}>
                    {
                        pathname === "/" && !isMobile ?
                            <div className=' flex h-screen items-center justify-center flex-col dark:bg-gray-700'>
                                <IoChatbubblesSharp className='w-14 h-14 text-gray-700 dark:text-slate-300' />
                                <h5 className='text-center w-full text-2xl font-bold uppercase text-gray-700 dark:text-slate-300 drop-shadow'>Please select a Chatroom</h5>
                            </div>
                            :
                            pathname.startsWith("/room") &&
                            <Chat />
                    }
                </div>
            </div>
        </RoomsProvider>
    )
}

export default Home