import React, {useState } from 'react'
import { handleAlert } from '../../Utils/Alert/handleAlert'
import { checkImage , imageUpload } from '../../Utils/UploadFile/Img'
import { useProfileStore } from '../../Zustand/UserProfile/store'
import { UpdateUser } from '../../Utils/CustomApi/User'
import {useLoadingStore} from "../../Zustand/Loading/store"
import Button from '../Button/Button'
import router from 'next/router'

const Profile = ({setOpenModal , data}) => {

  const [dataModal , setDataModal] = useState(data)

  const [image , setImage] = useState<any>()

  let profile =  useProfileStore(state => state?.profile[0])

  const changeMode = useLoadingStore(state => state?.changeMode)


  const handleOnChange = (e) => {
    const {name , value } = e.target
    setDataModal({...dataModal , [name] : value}) 
  }

  const handleUpdate = async () => {
      if(dataModal.name === "" && dataModal.description === "" && dataModal.img === ""){
          handleAlert('error', 'Chỉnh sửa thất bại')
      }else{
          profile.name = dataModal.name
          profile.image = dataModal.image
          UpdateUser(profile._id,dataModal)
          router.push(`/AccountProfile`)
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
      setDataModal({...dataModal , image : img.url}) 
      changeMode(false)
    }
}

  return (
    <div  className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]   bg-stone-800 rounded-md"  >
      <div  className="p-5 flex flex-col gap-3 " >
            <div className="text-white font-bold text-2xl mb-3 flex items-center justify-between">
                    <span>Chi tiết hồ sơ</span>
                    <i onClick = {() => setOpenModal(false)} className='bx bx-x cursor-pointer'></i>
            </div>

            <div className='flex items-center justify-between gap-3 h-44 w-[28rem]'>
                <div className='w-[12rem] bg-no-repeat rounded-full bg-contain h-[12rem] shadow-2xl group'>
                                 {
                                        image ? <div className = "h-[100%] w-[100%] rounded-full relative">
                                                    <img className="group rounded-full w-full h-full" src= {URL.createObjectURL(image)} alt="" />
                                                    <i onClick = {() => setImage("")} className='bx bx-x absolute top-0 right-0 cursor-pointer text-white text-2xl font-bold'></i>
                                                </div>  :
                                                <div className = {`flex items-center justify-center shadow-2xl group bg-stone-700 h-[100%] w-[100%] rounded-full`}>
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
                </div>

                <div className='w-[15rem] h-full flex flex-col justify-center items-end'>
                    <input name = "name" onChange={(e) => handleOnChange(e)} value = {dataModal?.name} type="text " className="bg-stone-700 rounded-sm outline-none h-[20%] text-white w-[100%] p-3" />
                    <Button>
                        <span onClick={() => handleUpdate()}>
                                Lưu
                        </span>  
                    </Button>
                </div>
            </div>
     </div>  
    </div>
  )
}

export default Profile