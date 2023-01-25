import axios from "../Axios/axios"


// Get song 

export const GetSong = async (id : string) => {
    try {
        const data = await axios.get("/api/Music/GetSong" , {
            params : {
                id : id
            }
        })
         return data
    } catch(err) {
        console.log(err)
    }
}

// Get Detail Playlist

export const GetDetailPlaylist = async (id : string) => {
    try {
        const data = await axios.get("/api/Music/GetDetailPlaylist" , {
            params: {
                id: id
            }
        })
        return data
    } catch(err) {
        console.log(err)
    }
}

// Get Home


export const GetHome = async () => {
    try {
        const data = await axios.get("/api/Music/GetHome")
        return data;
    } catch(err) {
        console.log(err)
    }
}


// Get top 100
export const GetTop100 = async () => {
    try {
        const data = await axios.get("/api/Music/GetTop100")
        console.log(data);
    } catch(err) {
        console.log(err)
    }
}


// Get Chart Home

export const ChartHome = async () => {
    try {
        const data = await axios.get("/api/Music/GetChartHome")
        return data;
    } catch(err) {
        console.log(err)
    }
}


// Get New Release Chart

export const GetNewReleaseChart = async () => {
    try {
        const data = await axios.get("/api/Music/GetNewReleaseChart")
        return data;
    } catch(err) {
        console.log(err)
    }
}

// Get Song Info

export const GetSongInfo = async (id : string) => {
    try {
        const data = await axios.get("/api/Music/GetSongInfo" , {
            params : {
                id : id,
            }
        })
        return data
    } catch(err) {
        console.log(err)
    }
}



// Get Artist

export const GetArtist = async (name : string) => {
    try {
        const data = await axios.get("/api/Music/GetArtist" , {
            params : {
                name : name
            }
        })
        return data;
    } catch(err) {
        console.log(err)
    }
}


// Get List Song Artist

export const GetListSongArtist = async (id : string , page : number , count : number) => {
    try {
        const data = await axios.get("/api/Music/GetListSongArtist" , {
            params : {
                id : id,
                page : page,
                count : count
            }
        })
        console.log(data);
    } catch(err) {
        console.log(err)
    }
}

// Get Lyric Song


export const GetLyricSong = async (id : string) => {
    try {
        const data = await axios.get("/api/Music/GetLyricSong" , {
            params : {
                id : id,
            }
        })
       return data;
    } catch(err) {
        console.log(err)
    }
}

// Search Song

export const GetSearchSong = async (name : any) => {
    try {
        const data = await axios.get("/api/Music/SearchSong" , {
            params : {
                name : name,
            }
        })
        return data;
    } catch(err) {
        console.log(err)
    }
}

// Get List MV

export const GetListMV = async (id : string , page : number , count : number) => {
    try {
        const data = await axios.get("/api/Music/GetListMV" , {
            params: {
                id: id,
                page: page,
                count
            }
        })
        console.log(data);
    } catch(err) {
        console.log(err)
    }
}
// Get Category MV

export const GetCategoryMV = async (id: string) => {
    try {
        const data = await axios.get("/api/Music/GetCategoryMV" , {
            params: {
                id : id
            }
        })
        console.log(data);
    } catch(err) {
        console.log(err)
    }
}


// Get Video MV

export const GetVideoMV = async (id : string) => {
    try {
        const data = await axios.get("/api/Music/GetVideoMV" , {
            params: {
                id : id
            }
        })
        console.log(data);
    } catch(err) {
        console.log(err)
    }
}



// Add favorite song
export const AddFavoriteSong = async  (item : any , idUser) => {
    try {
        const data = await axios.post("/api/User/LikeSong" , {
            item: item,
            idUser: idUser
        })
    } catch(err) {
        console.log(err)
    }
}




// remove favorite song
export const RemoveFavoriteSong = async  (idSong : any , idUser:any) => {
    try {
        const data = await axios.post("/User/RemoveLikeSong" , {
                idSong: idSong,
                idUser: idUser
        })
    } catch(err) {
        console.log(err)
    }
}





