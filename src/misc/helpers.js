import { equalTo, onValue, orderByChild, query, ref } from "firebase/database";

export const transformToArray = (snapval) => {
    if (!snapval) {
        return []
    }
    const arrData = Object.keys(snapval).map(roomId => {
        return { ...snapval[roomId], id: roomId }
    })
    return arrData;
}

export const getUserUpdates = (userId, keyToUpdate, value, db) => {

    const updates = {}
    updates[`/profiles/${userId}/${keyToUpdate}`] = value

    const getMsgs = query(ref(db, `/messages`), orderByChild('/user/userId'), equalTo(userId))

    onValue(getMsgs, (snap) => {
        snap.forEach(s => {
            updates[`/messages/${s.key}/user/${keyToUpdate}`] = value
        })
    })
    return updates;
}

export const groupBy = (array, groupingKeyFn) => {
    return array.reduce((acc, item) => {
        const groupingKey = groupingKeyFn(item)
        if (!acc[groupingKey]) {
            acc[groupingKey] = []
        }
        acc[groupingKey].push(item)
        return acc
    }, {})
}