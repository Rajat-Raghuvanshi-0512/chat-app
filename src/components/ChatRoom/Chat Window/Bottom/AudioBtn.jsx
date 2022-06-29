import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import React from 'react'
import { useState } from 'react'
import { BsMicFill } from 'react-icons/bs'
import { ReactMic } from "react-mic"
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { storage } from '../../../../misc/firebase'

const AudioBtn = ({ afterUpload }) => {
    const [isRecording, setIsRecording] = useState(false)
    const [loading, setIsLoading] = useState(false)
    const { roomId } = useParams()
    const onUpload = async (data) => {
        try {
            setIsLoading(true)
            const storageRef = ref(storage, `chat/${roomId}/Audio-${Date.now()}.mp3`)
            const snap = await uploadBytes(storageRef, data.blob, {
                cacheControl: `public, max-age=${3600 * 24 * 3}`
            })
            console.log(snap);
            const file = {
                contentType: snap.metadata.contentType,
                name: snap.metadata.name,
                id: snap.metadata.name,
                url: await getDownloadURL(snap.ref),
            }
            await afterUpload([file])
            setIsLoading(false)
        } catch (error) {
            toast.error(error.message)
            setIsLoading(false)
        }
    }
    return (
        <button disabled={loading}>
            <BsMicFill className={`w-5 h-5 ml-2 cursor-pointer text-slate-700 ${isRecording && "animate-pulse"}`} onClick={() => setIsRecording(!isRecording)} />
            <ReactMic
                record={isRecording}
                onStop={onUpload}
                mimeType="audio/mp3"
                className='hidden'
            />
        </button>
    )
}

export default AudioBtn