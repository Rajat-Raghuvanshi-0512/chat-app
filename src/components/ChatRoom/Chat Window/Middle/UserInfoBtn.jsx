import { ref, runTransaction } from 'firebase/database'
import { useCallback } from 'react'
import Moment from 'react-moment'
import { useParams } from 'react-router-dom'
import { useModal, usePresence } from "../../../../misc/custom-hooks"
import { database } from '../../../../misc/firebase'
import Avatar from '../../../Avatar'
import Modal from "../../../Modal"
import { toast } from "react-toastify"

const UserInfoBtn = ({ user, isMsgUserAdmin, canGrantAdmin }) => {

    const { isOpen, openModal, closeModal } = useModal()
    const { roomId } = useParams()
    const presence = usePresence(user.userId)
    const name = user.name.split(' ')[0]
    const handleClick = useCallback(async () => {
        const adminRef = ref(database, `rooms/${roomId}/admins`)
        let message;
        try {
            await runTransaction(adminRef, (admins) => {
                if (admins[user.userId]) {
                    admins[user.userId] = null
                    message = "Removed from Admin"
                } else {
                    admins[user.userId] = true;
                    message = "Promoted to Admin"
                }
                return admins
            })
            toast.success(message)
        } catch (error) {
            toast.error(error)
        }
    }, [roomId, user.userId])
    return (
        <>
            <button className='hover:underline cursor-pointer select-none pr-5' onClick={openModal}>{name}</button>
            <Modal isOpen={isOpen} closeModal={closeModal} title={`${user.name}'s Profile`} closeText={"Close"}>
                <div className='flex items-center justify-center my-5 flex-col gap-2 dark:text-slate-100 px-7'>
                    <Avatar image={user.avatar} status={presence} size={52} />
                    <div className='text-xl'>{user.name}</div>
                    <div className='text-md'>
                        <span className='text-lg'>Member since </span>
                    </div>
                    <Moment format='DD/MM/YYYY'>{user.createdAt}</Moment>
                    {
                        canGrantAdmin &&
                        <button className={`${isMsgUserAdmin ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"} text-white px-3 py-2 w-full rounded-lg text-lg`} onClick={handleClick}>
                            {isMsgUserAdmin ? "Dismiss as Admin" : "Promote to admin"}
                        </button>

                    }

                </div>
            </Modal>
        </>
    )
}

export default UserInfoBtn