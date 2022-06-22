import { onDisconnect, onValue, ref, serverTimestamp, set } from 'firebase/database'
import { createContext, useContext, useEffect, useState } from 'react'
import { auth, database } from '../misc/firebase'

const ProfileContext = createContext()

export const isOfflineForDatabase = {
    state: 'offline',
    last_changed: serverTimestamp(),
};

const isOnlineForDatabase = {
    state: 'online',
    last_changed: serverTimestamp(),
};

const ProfileProvider = ({ children }) => {

    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let userUnsub;
        let statusUnsub;
        const unsubscribe = auth.onAuthStateChanged(authObj => {
            if (!authObj) {
                setProfile(null)
                setLoading(false)
                return
            }
            const userStatusRef = ref(database, `/status/${authObj.uid}`);
            const dbref = ref(database, `/profiles/${authObj.uid}`);
            userUnsub = onValue(dbref, snapshot => {
                const { name, createdAt, avatar } = snapshot.val()
                const data = {
                    name,
                    createdAt,
                    avatar: avatar ? avatar : authObj.photoURL,
                    email: authObj.email,
                    photoUrl: authObj.photoURL,
                    uid: authObj.uid,
                }
                setProfile(data)
                setLoading(false)

                const connectionRef = ref(database, '.info/connected');
                statusUnsub = onValue(connectionRef, async (snapshot) => {
                    if (snapshot.val() === false) {
                        return;
                    };
                    await onDisconnect(userStatusRef).set(isOfflineForDatabase)
                    await set(userStatusRef, isOnlineForDatabase);
                });
            })
        })
        return () => {
            unsubscribe()
            if (userUnsub) userUnsub()
            if (statusUnsub) statusUnsub()
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