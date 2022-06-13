import { onValue, ref, off } from 'firebase/database'
import { createContext, useContext, useEffect, useState } from 'react'
import { auth, database } from '../misc/firebase'

const ProfileContext = createContext()

const ProfileProvider = ({ children }) => {

    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let userUnsub;
        const unsubscribe = auth.onAuthStateChanged(authObj => {
            if (!authObj) {
                setProfile(null)
                setLoading(false)
                return
            }
            const dbref = ref(database, `/profiles/${authObj.uid}`);
            userUnsub = onValue(dbref, snapshot => {
                const { name, createdAt } = snapshot.val()
                const data = {
                    name,
                    createdAt,
                    email: authObj.email,
                    photoUrl: authObj.photoURL,
                    uid: authObj.uid,
                }
                setProfile(data)
                setLoading(false)
            })
        })
        return () => {
            unsubscribe()
            if (userUnsub) userUnsub()
        }
    }, [])

    return (
        <ProfileContext.Provider value={{ profile, loading }}>
            {children}
        </ProfileContext.Provider>
    )
}

export const useProfile = () => useContext(ProfileContext)

export default ProfileProvider