import axios from "axios"

export const GetUser = async  (idUser:any) => {
    try {
        const data = await axios.get("api/User/GetUser" , {
               params : {
                    idUser : idUser
               }
        })
        return data.data
    } catch(err) {
        console.log(err)
    }
}


export const UpdateUser = async  (idUser:any , dataUser : any) => {
    try {
        const data = await axios.put("api/User/UpdateUser" , {
              
                    idUser : idUser,
                    dataUser : dataUser
               
        })
        return data.data
    } catch(err) {
        console.log(err)
    }
}

