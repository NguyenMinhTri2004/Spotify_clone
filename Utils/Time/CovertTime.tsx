export const CovertTime = (time : number) =>{
    const minutes = Math.floor(time / 60)
    const seconds = time - minutes * 60

    return `${minutes}:${seconds}`
}


export const CovertTimeTitle = (time : number) =>{
    const hour = Math.floor(time / 3600)
    let minutes = Math.floor((time - (hour * 3600)) / 60)

    return `${hour} giờ ${minutes} phút`
}
