import React, { useEffect, useState } from 'react'
import InputByCategory from "../../components/Search/InputByCategory"
import SectionBody from "../../components/Section/SectionBody"
import {AddFavoriteArtist , RemoveFavoriteArtist} from "../../Utils/CustomApi/Artist"
import { useProfileStore } from '../../Zustand/UserProfile/store'
import { useArtistStore } from '../../Zustand/Artist/store'
import { handleAlert } from '../../Utils/Alert/handleAlert'
import { usePlayMusicStore } from '../../Zustand/Music/store'
import { AddPlayList, RemovePlayList } from '../../Utils/CustomApi/PlayList'

const MenuTitle = ({id , description , name , img , artist  , menu} : any) => {

  const selectArray = [
        {
                displayName: "Thứ tự tùy chỉnh"
        },

        {
                displayName: "Tiêu đề"
        },

        {
                displayName: "Nghệ sĩ"
        },

        {
                displayName: "Album"
        },

        {
                displayName: "Thời lượng"
        },
  ]

  let profile = useProfileStore(state => state?.profile)

  const idUser = profile[0]?._id

  const idPlayList = usePlayMusicStore(state => state?.idPlayList)

  const [like , setLike] = useState(false)

  const data = useArtistStore(state => state?.artist)

  const [playMode , setPlayMode] = useState(false)

  const addCurrentMusic = usePlayMusicStore((state) => state?.addCurrentMusic)

  const playLists = useProfileStore(state => state?.profile[0]?.playLists)

  const likedArtists = useProfileStore(state => state?.profile[0]?.likedArtists)

  const setProfile = useProfileStore(state => state?.setProfile)

  const dataPlayList = usePlayMusicStore(state => state?.playList)

  const changePlay = usePlayMusicStore(state => state?.changePlay)

  const queue = usePlayMusicStore(state => state?.queue)

  const addQueue = usePlayMusicStore((state) => state?.addQueue)

  const updatePlayList = usePlayMusicStore(state => state?.updatePlayList)

  let index = 0

  const handleLikeArtist = () => {
        setLike(true)
        likedArtists.push(data)
        profile[0].likedArtists = likedArtists
        setProfile(profile)
        setLike(true)
        AddFavoriteArtist(data , idUser) 
        handleAlert('success' , 'Đã thêm nghệ sĩ vào danh sách yêu thích')
  }


  const handleRemoveLikeArtist = () => {
        setLike(false)
        const tmpArray = likedArtists.filter(song => song?.id !== data?.id)
        profile[0].likedArtists = tmpArray
        setProfile(profile)
        RemoveFavoriteArtist(data?.id , idUser)
        handleAlert('success' , 'Đã xóa nghệ sĩ khỏi danh sách yêu thích')
  }


  const handleRemoveLikePlayList = () => {
        setLike(false)
        const tmp = profile[0].playLists.filter(item => item?.id !== Number(id))
        profile[0].playLists = tmp
        setProfile(profile)
        RemovePlayList(id , idUser)
        handleAlert('success' , "Xóa playlist thành công")
  }


  const handleAddLikePlayList = () => {
        setLike(true)
        const data = {
                id : idPlayList,
                name : name,
                description : description,
                img : img,
                data : dataPlayList,
                canChangeImage : false,
             }
        playLists.push(data)
        profile[0].playLists = playLists
        setProfile(profile)
        AddPlayList(data , idUser)
        handleAlert('success' , "Tạo playlist thành công")
  }


  const handlePlayMusic = async (data : any) => {
        const check = data.find(song => song?.encodeId === dataPlayList[index]?.encodeId)
        
        if(dataPlayList[index]?.streamingStatus === 1){
                changePlay(true)
                if(check) {
                        addCurrentMusic(index , dataPlayList[index]?.encodeId)
                        updatePlayList(false)
                        changePlay(true)
                        setPlayMode(true)
                }else{
                        updatePlayList(true)
                        addQueue(dataPlayList)
                        handlePlayMusic(dataPlayList)
                        index++
                }
       }else {
              alert("Bai hat la bai hat vip !!!")
        }
}


  const handleStopMusic = async () => {
        changePlay(false)
        setPlayMode(false)
  }


  useEffect(() =>{
        if(artist && likedArtists?.find(artist => artist?.id === data?.id) ){
                setLike(true)
        }else{
                if(playLists?.find(playList => playList?.id === idPlayList)){
                        setLike(true)
                }else{
                        setLike(false)
                }
        }

       
  }, [data?.id, idPlayList])

  return (
    <SectionBody>
            <div className = "flex justify-between items-center w-full px-7 mb-3">
                <div className = "text-gray-300 text-4xl flex items-center gap-5 ">
                        <span className = "bg-green-500 rounded-full  flex w-14 h-14 items-center justify-center cursor-pointer hover:scale-105 ease-in-out duration-300">
                            {
                                playMode ? <i onClick = {() => handleStopMusic()} className='bx bx-pause text-black'></i>
                                : <i onClick = {() => handlePlayMusic(queue)} className='bx bx-play text-black'></i>
                            }
                        </span>
                        
                        {
                                like ?
                                <i onClick = {artist ? () => handleRemoveLikeArtist() : () => handleRemoveLikePlayList()} className='bx bxs-heart text-green-500 cursor-pointer hover:text-white ease-in-out duration-500 ' ></i>
                                :
                                <i onClick = {artist ? () => handleLikeArtist() : () => handleAddLikePlayList()} className='bx bx-heart cursor-pointer hover:text-white ease-in-out duration-500 ' ></i>
                        }

                        <i className='bx bx-download cursor-pointer hover:text-white ease-in-out duration-500 '></i>

                        <i className='bx bx-dots-horizontal-rounded cursor-pointer hover:text-white ease-in-out duration-500 '></i>
                </div>

                <div>
                        <InputByCategory selectArray = {selectArray}/>
                </div>
            </div>
    </SectionBody>
  )
}

export default MenuTitle


