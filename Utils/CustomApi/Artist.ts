import axios from "axios"

// Add favorite artist
export const AddFavoriteArtist = async  (Artist : any , idUser) => {
    try {
        const data = await axios.post("/api/User/LikeArtist" , {
            Artist: Artist,
            idUser: idUser
        })
    } catch(err) {
        console.log(err)
    }
}




// remove favorite artist
export const RemoveFavoriteArtist = async  (idArtist : any , idUser) => {
    try {
        const data = await axios.post("/api/User/RemoveLikeArtist" , {
            idArtist: idArtist,
            idUser: idUser
        })
    } catch(err) {
        console.log(err)
    }
}
