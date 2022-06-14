export const transformToArray = (snapval) => {
    if (!snapval) {
        return []
    }
    const arrData = Object.keys(snapval).map(roomId => {
        return { ...snapval[roomId], id: roomId }
    })
    return arrData;
}