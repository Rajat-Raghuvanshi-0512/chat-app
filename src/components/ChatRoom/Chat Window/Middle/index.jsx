import { useEffect, useState } from 'react'
import { equalTo, onValue, orderByChild, query, ref, runTransaction, update } from "firebase/database"
import { auth, database } from "../../../../misc/firebase"
import { useParams } from 'react-router-dom'
import { groupBy, transformToArray } from "../../../../misc/helpers"
import MessageItem from './MessageItem'
import { ImCross } from 'react-icons/im'
import { toast } from "react-toastify"
import { useRef } from 'react'

const shouldScrollToBottom = (node, threshold = 30) => {
    const percentage = (100 * node.scrollTop) / (node.scrollHeight - node.clientHeight) || 0
    return percentage > threshold
}

const Middle = () => {
    const { roomId } = useParams()
    const [messages, setMessages] = useState(null)
    const selfRef = useRef()
    const node = selfRef.current;
    console.log(selfRef.value);

    const isChatEmpty = messages && messages.length === 0;
    const canShowMsgs = messages && messages.length > 0;
    const myUid = auth.currentUser.uid;

    const handleLike = async (msgId) => {
        const msgRef = ref(database, `messages/${msgId}`)
        await runTransaction(msgRef, (msg) => {
            if (msg.likes && msg.likes[myUid]) {
                msg.likesCount -= 1;
                msg.likes[myUid] = null
            } else {
                if (!msg.likes) msg.likes = {};
                msg.likesCount += 1;
                msg.likes[myUid] = true;
            }
            return msg
        })
    }

    const handleDelete = async (msgId) => {

        const isLast = messages[messages.length - 1].id === msgId
        const updates = {};
        updates[`/messages/${msgId}`] = null;
        if (isLast && messages.length > 1) {
            updates[`/rooms/${roomId}/lastMessage`] = messages[messages.length - 2].message
            updates[`/rooms/${roomId}/lastMessageAt`] = messages[messages.length - 2].createdAt
        }
        if (isLast && messages.length === 1) {
            updates[`/rooms/${roomId}/lastMessage`] = null;
        }
        console.log(updates);
        try {
            await update(ref(database), updates)
        } catch (error) {
            toast.error(error)
        }
    }

    useEffect(() => {
        const msgRef = query(ref(database, "messages"), orderByChild(`roomId`), equalTo(roomId))

        const unsub = onValue(msgRef, snap => {
            setMessages(transformToArray(snap.val()))
            if (shouldScrollToBottom(node)) {
                node.scrollTop = node.scrollHeight;
            }
        })
        setTimeout(() => {
            node.scrollTop = node.scrollHeight;
        }, 500);

        return () => {
            unsub()
        }
    }, [roomId, node])

    const renderMsgs = () => {
        const groups = groupBy(messages, (msgItem) => {
            return new Date(msgItem.createdAt).toDateString()
        })
        let groupedMessages = []
        Object.keys(groups).forEach((date) => {
            groupedMessages.push(<li className='drop-shadow select-none bg-slate-200 w-fit p-2 my-5 dark:bg-slate-700 dark:text-white rounded mx-auto' key={date}>{date}</li>)
            const msgs = groups[date].map(msg => (
                <MessageItem key={msg.id} msg={msg} handleLike={handleLike} handleDelete={handleDelete} />
            ))
            groupedMessages.push(...msgs)
        })
        return groupedMessages
    }

    return (
        <>
            <ul className='overflow-y-auto small-scroll px-4 h-full' ref={selfRef}>
                {isChatEmpty && <li className='flex flex-col gap-3 items-center justify-center h-full'>
                    <ImCross className='text-3xl' />
                    <h5 className='text-center text-2xl font-bold uppercase drop-shadow'>No Messages Yet...</h5>
                </li>}
                {
                    canShowMsgs && renderMsgs()
                }
            </ul>
        </>
    )
}

export default Middle