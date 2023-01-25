import axios from "axios"



// Add favorite PlayList
export const AddPlayList = async  (PlayList : any , idUser) => {
    try {
        const data = await axios.post("/api/User/AddPlayList" , {
            PlayList: PlayList,
            idUser: idUser
        })
    } catch(err) {
        console.log(err)
    }
}


export const AddSongToPlayList = async  (Song : any , idPlayList: any , idUser) => {
    try {
        const data = await axios.post("/api/User/AddSongToPlayList" , {
            Song: Song,
            idUser: idUser,
            idPlayList
        })
    } catch(err) {
        console.log(err)
    }
}




// remove favorite PlayList
export const RemoveSongOfPlayList = async  (idPlayList : any , idSong, idUser) => {
    try {
        const data = await axios.post("/api/User/RemoveSongOfPlayList" , {
            idPlayList: idPlayList,
            idUser: idUser,
            idSong : idSong
        })
    } catch(err) {
        console.log(err)
    }
}


export const RemovePlayList = async  (idPlayList : any , idUser) => {
    try {
        const data = await axios.post("/api/User/RemovePlayList" , {
            idPlayList: idPlayList,
            idUser: idUser
        })
    } catch(err) {
        console.log(err)
    }
}




export const UpdatePlayList = async  (idPlayList : any , idUser , dataPlayList : any) => {
    try {
        const data = await axios.put("/api/User/UpdatePlayList" , {
            idPlayList: idPlayList,
            idUser: idUser,
            dataPlayList : dataPlayList
        })
    } catch(err) {
        console.log(err)
    }
}


