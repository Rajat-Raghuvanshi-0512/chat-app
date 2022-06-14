import { onValue, ref } from "firebase/database";
import { createContext, useContext, useEffect, useState } from "react";
import { database } from "../misc/firebase";
import { transformToArray } from "../misc/helpers";

const RoomsContext = createContext()

export const useRooms = () => useContext(RoomsContext)

const RoomsProvider = ({ children }) => {
    const [rooms, setRooms] = useState([])
    useEffect(() => {
        const roomListRef = ref(database, "rooms")
        const unsub = onValue(roomListRef, snapshot => {
            const data = transformToArray(snapshot.val())
            setRooms(data)
        })
        return () => {
            unsub()
        }
    }, [])

    return (
        <RoomsContext.Provider value={{ rooms }}>
            {children}
        </RoomsContext.Provider>
    )
}

export default RoomsProvider