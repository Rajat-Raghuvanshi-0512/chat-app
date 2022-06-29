import { push, ref, serverTimestamp, update } from 'firebase/database'
import React, { useState, memo } from 'react'
import { RiSendPlaneFill } from "react-icons/ri"
import { useParams } from 'react-router-dom'
import { useProfile } from '../../../../context/ProfileContext'
import { database } from '../../../../misc/firebase'
import { toast } from "react-toastify"
import UploadFileModal from './UploadFileBtnModal'
import { useCallback } from 'react'
import AudioBtn from './AudioBtn'

const assembleMessage = (profile, chatId) => {
    return {
        roomId: chatId,
        user: {
            name: profile.name,
            userId: profile.uid,
            createdAt: profile.createdAt,
            ...(profile.avatar ? { avatar: profile.avatar } : {})
        },
        likesCount: 0,
        createdAt: serverTimestamp()
    }
}

const Bottom = () => {
    const [input, setInput] = useState('')
    const { profile } = useProfile()
    const { roomId } = useParams()
    const [loading, setLoading] = useState(false)

    const sendMessage = async () => {
        if (input.trim() === '') return

        setLoading(true)
        const msgData = assembleMessage(profile, roomId)
        msgData.message = input;
        const msgDBRef = ref(database, `messages`)
        const msgId = push(msgDBRef).key
        try {
            const msgRef = ref(database, `messages/${msgId}`)
            const roomRef = ref(database, `rooms/${roomId}`)
            await update(msgRef, msgData)
            await update(roomRef, {
                lastMessage: input,
                lastMessageAt: serverTimestamp()
            })
            setLoading(false)
            setInput('')

        } catch (error) {
            toast.error(error.message)
            setLoading(false)
        }
    }

    const onKeyDown = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault()
            sendMessage()
        }
    }

    const afterUpload = useCallback((files) => {
        files.forEach(async file => {
            setLoading(true)
            const msgData = assembleMessage(profile, roomId)
            msgData.file = file;
            const msgDBRef = ref(database, `messages`)
            const msgId = push(msgDBRef).key
            try {
                const msgRef = ref(database, `messages/${msgId}`)
                const roomRef = ref(database, `rooms/${roomId}`)
                await update(msgRef, msgData)
                await update(roomRef, {
                    lastMessage: file.name,
                    lastMessageAt: serverTimestamp()
                })
                setLoading(false)
            } catch (error) {
                toast.error(error.message)
                setLoading(false)
            }
        })
    }, [profile, roomId])

    return (
        <div className='flex w-full p-4'>
            <div className='flex items-center w-full border-[1.5px] border-r-0 rounded-l bg-white'>
                <AudioBtn afterUpload={afterUpload} />
                <UploadFileModal afterUpload={afterUpload} />
                <input
                    type="text"
                    className='px-3 py-2  outline-none w-full'
                    placeholder='Type a message...'
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={onKeyDown}
                />
            </div>
            <button
                className='bg-sky-500 hover:bg-sky-700 rounded-r px-5 disabled:bg-slate-300 -translate-x-1 sm:translate-x-0'
                onClick={sendMessage}
                disabled={loading}
            >
                <RiSendPlaneFill className='w-7 h-7 text-white' />
            </button>
        </div>
    )
}

export default memo(Bottom)