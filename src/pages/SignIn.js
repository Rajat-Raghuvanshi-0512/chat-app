import React from 'react'
import { AiFillGithub, AiOutlineGoogle } from "react-icons/ai"
import { getAdditionalUserInfo, GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth, database } from '../misc/firebase'
import { ref, serverTimestamp, set } from 'firebase/database';
import { toast } from "react-toastify"
const SignIn = () => {

    const signInWithProvider = async provider => {
        try {
            const credential = await signInWithPopup(auth, provider);
            const userMeta = getAdditionalUserInfo(credential);

            if (userMeta.isNewUser) {
                await set(ref(database, `/profiles/${credential.user.uid}`), {
                    name: credential.user.displayName,
                    createdAt: serverTimestamp(),
                });
            }

        } catch (err) {
            toast.error(err.message);
        }
    };

    const authenticateWithGoogle = () => {
        signInWithProvider(new GoogleAuthProvider())
    }
    const authenticateWithGithub = () => {
        signInWithProvider(new GithubAuthProvider())
    }
    return (
        <div className='flex flex-col justify-center items-center h-screen w-screen dark:bg-slate-700 dark:text-slate-100'>
            <h1 className='text-center text-3xl sm:text-4xl md:text-5xl font-bold'>Welcome to Chat App</h1>
            <p className='text-center text-md sm:text-xl md:text-2xl  py-14'>Progressive chat platform for everyone.</p>
            <div className='flex flex-col sm:flex-row gap-4'>
                <button
                    className='text-white bg-red-500 hover:bg-red-600 flex items-center px-4 py-2 rounded-md'
                    onClick={authenticateWithGoogle}
                >
                    <AiOutlineGoogle className='w-5 h-5 mr-2' />
                    Continue with Google
                </button>
                <button
                    className='text-white bg-slate-800 hover:bg-black flex items-center px-4 py-2 rounded-md'
                    onClick={authenticateWithGithub}
                >
                    <AiFillGithub className='w-5 h-5 mr-2' />
                    Continue with Github
                </button>
            </div>
        </div>
    )
}

export default SignIn