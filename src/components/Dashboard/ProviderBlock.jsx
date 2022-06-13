import React, { useState } from 'react'
import { auth } from '../../misc/firebase';
import { FaGoogle, FaGithub } from "react-icons/fa"
import { ImCross } from "react-icons/im"
import { GithubAuthProvider, GoogleAuthProvider, linkWithPopup, unlink } from 'firebase/auth';
import { toast } from "react-toastify"

const ProviderBlock = () => {
    const [isConnected, setIsConnected] = useState({
        "google.com": auth.currentUser.providerData.some(provider => provider.providerId === "google.com"),
        "github.com": auth.currentUser.providerData.some(provider => provider.providerId === "github.com"),
    });
    const unlinkFrom = async (providerId) => {
        try {
            if (auth.currentUser.providerData.length === 1) {
                toast.error("You can't unlink your last provider")
                return;
            }
            await unlink(auth.currentUser, providerId);
            setIsConnected(() => ({ ...isConnected, [providerId]: false }))
            toast.info(`Unlinked from ${providerId}`)
        } catch (error) {
            toast.error(error.message)
        }
    }
    const unlinkGoogle = async () => {
        unlinkFrom("google.com")
    }
    const unlinkGithub = async () => {
        unlinkFrom("github.com")
    }
    const link = async (provider) => {
        try {
            await linkWithPopup(auth.currentUser, provider)
            toast.success(`Linked to ${provider.providerId}`)
            setIsConnected(() => ({ ...isConnected, [provider.providerId]: true }))
        } catch (error) {
            toast.error(error.message)
        }
    }
    const linkGoogle = async () => {
        link(new GoogleAuthProvider())
    }
    const linkGithub = async () => {
        link(new GithubAuthProvider())
    }
    return (
        <div>
            <div className="connectionStatus flex gap-x-5">
                {isConnected['google.com'] &&
                    <button className='bg-red-500 rounded text-white py-1 px-2 flex items-center justify-center gap-x-2' >
                        <FaGoogle className='w-4 h-4 text-white' />
                        Connected
                        <ImCross className='w-2 h-2 text-white hover:scale-125' onClick={unlinkGoogle} />
                    </button>}
                {isConnected['github.com'] &&
                    <button className='bg-black rounded text-white py-1 px-2 flex items-center gap-x-2'>
                        <FaGithub className='w-4 h-4 text-white' />
                        Connected
                        <ImCross className='w-2 h-2 text-white hover:scale-125' onClick={unlinkGithub} />
                    </button>}
            </div>
            <div className="connectNow  space-y-5">
                {
                    !isConnected['google.com'] &&
                    <button className="bg-red-500 w-full py-2 mt-7 rounded-lg text-white hover:bg-red-600 font-semibold drop-shadow-lg flex justify-center items-center gap-2" onClick={linkGoogle}>
                        <FaGoogle className='w-4 h-4 text-white' />
                        Link to Google
                    </button>
                }
                {
                    !isConnected['github.com'] &&
                    <button className="bg-gray-800 w-full py-2 rounded-lg text-white hover:bg-gray-900 font-semibold drop-shadow-lg flex justify-center items-center gap-2  mt-7" onClick={linkGithub}>
                        <FaGithub className='w-4 h-4 text-white' />
                        Link to Github
                    </button>
                }
            </div>
        </div>
    )
}

export default ProviderBlock