import React, { useState } from 'react'
import Button from '../Button/Button'
import { UpdatePlayList } from '../../Utils/CustomApi/PlayList'
import router from 'next/router'
import { useProfileStore } from '../../Zustand/UserProfile/store'
import { handleAlert } from '../../Utils/Alert/handleAlert'
import { checkImage , imageUpload } from '../../Utils/UploadFile/Img'
import {useLoadingStore} from "../../Zustand/Loading/store"

const DetailPlayList = ({setOpenModal , data} : any) => {

  let profile =  useProfileStore (state => state?.profile)

  const [image , setImage] = useState<any>()

  const idUser = profile[0]?._id

  const [dataModal , setDataModal] = useState(data)

  const changeMode = useLoadingStore(state => state?.changeMode)

  const handleOnChange = (e) => {
        e.preventDefault()
        const {name , value } = e.target
        setDataModal({...dataModal , [name] : value}) 
  }

  const handleUpdate = async () => {
        if(dataModal.name === "" && dataModal.description === "" && dataModal.img === ""){
            handleAlert('error', 'Chỉnh sửa thất bại')
        }else{
            const index = profile[0].playLists.findIndex(item => item.id === dataModal.id)
            profile[0].playLists[index].name = dataModal.name
            profile[0].playLists[index].description = dataModal.description
            profile[0].playLists[index].img = dataModal.img
            UpdatePlayList(dataModal.id,idUser,dataModal)
            router.push(`/PlayList/${dataModal.id}`)
            setOpenModal(false)
            handleAlert('success','Chỉnh sửa thành công')
        }
  }

  const handleChangeImages = async (e) => {
    let err = checkImage(e.target.files[0])
    if(err !== ''){
         handleAlert('error', err)
    }else{
        setImage(e.target.files[0])
        changeMode(true)
        const img = await imageUpload(e.target.files[0])
        setDataModal({...dataModal , img : img.url}) 
        changeMode(false)
    }
  }
  
  return (
    <div className="fixed  bg-stone-800 rounded-md top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">
       <div className="p-5 flex flex-col gap-3 ">
            <div className="text-white font-bold text-2xl mb-3 flex items-center justify-between">
                    <h2>Sửa thông tin chi tiết</h2>
                    <span onClick = {() => setOpenModal(false)} className="cursor-pointer">X</span>
            </div>

            <div className='flex items-center justify-between gap-2 h-44 w-[28rem]'>
                    {
                        image ? <div className = "h-[100%] w-[45%] rounded-md relative">
                                    <img className="group" src= {URL.createObjectURL(image)} alt="" />
                                    <i onClick = {() => setImage("")} className='bx bx-x absolute top-0 right-0 cursor-pointer text-white text-2xl font-bold'></i>
                                </div>  :
                                <div className = {`flex items-center justify-center shadow-2xl group bg-stone-700 h-[100%] w-[45%] rounded-md`}>
                                
                                                <i className={`bx bx-music text-white text-6xl group-hover:hidden `}></i>
                                                <div className = "hidden group-hover:translate-y-0 group-hover:block ">
                                                        <div className = "flex items-center flex-col cursor-pointer relative">
                                                                <i className='bx bx-pencil text-white text-6xl hidden'></i>
                                                                <input  accept = "image/*,video/*" onChange = {e =>  handleChangeImages(e)} className = "absolute bottom-0 left-0 h-20 opacity-0" type="file" name="img" id="" />
                                                                <span className = "text-white font-bold">Chọn ảnh</span>
                                                        </div>
                                                </div>
                                
                                 </div>
                    }
                    

                    <div className = "flex flex-col h-[100%] w-[55%] gap-2">
                        <input name = "name" onChange={(e) =>  handleOnChange(e)} value = {dataModal?.name} className = "bg-stone-700 rounded-sm outline-white h-[20%] text-white" type="text" />
                        <textarea name= "description" onChange={(e) =>  handleOnChange(e)} value = {dataModal?.description} className = "bg-stone-700 outline-white rounded-sm h-[80%] text-white">

                        </textarea>
                    </div>
            </div>

            <div className = "flex items-center justify-end">
                    <Button>
                       <span onClick={() => handleUpdate()}>
                             Lưu
                        </span>  
                    </Button>
            </div>
        </div> 
    </div>
  )
}

export default DetailPlayList