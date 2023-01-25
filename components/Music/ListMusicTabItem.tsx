import React, { useEffect, useState } from 'react'
import {CovertTime} from "../../Utils/Time/CovertTime"
import { usePlayMusicStore } from '../../Zustand/Music/store'
import {AddFavoriteSong , RemoveFavoriteSong} from "../../Utils/CustomApi/Music"
import { useProfileStore } from '../../Zustand/UserProfile/store'
import { usePlaylistStore } from '../../Zustand/PlayList/store'
import {AddSongToPlayList, RemoveSongOfPlayList} from "../../Utils/CustomApi/PlayList"
import { useRouter } from 'next/router'
import { handleAlert } from '../../Utils/Alert/handleAlert'
import { useSession } from 'next-auth/react'
import { ListMusicTabItemType } from '../../Types'

const ListMusicTabItem = ({item , index ,album , canAdd , canDelete , id} : any) => {

  const addCurrentMusic = usePlayMusicStore((state) => state?.addCurrentMusic)
  
  const idSong = usePlayMusicStore(state => state?.idSong)

  const { data: session } = useSession()

  const likedSongs =  useProfileStore (state => state?.profile[0]?.likedSongs)

  const [like , setLike] = useState(false)

  const setProfile =  useProfileStore (state => state?.setProfile)

  const router = useRouter()

  let profile =  useProfileStore (state => state?.profile)

  const idUser = profile[0]?._id

  const idPlayList = usePlaylistStore(state => state?.idMyPlayList)

  const playList =  useProfileStore (state => state?.profile[0]?.playLists.find(item => item?.id === idPlayList))

  const detailPlaylist = usePlayMusicStore(state => state?.playList)

  const changePlay = usePlayMusicStore(state => state?.changePlay)

  const queue = usePlayMusicStore(state => state?.queue)

  const updatePlayList = usePlayMusicStore(state => state?.updatePlayList)

  const play = usePlayMusicStore(state => state?.play)

  const addQueue = usePlayMusicStore((state) => state?.addQueue)

  const addIdPlayList = usePlayMusicStore(state => state?.addIdPlayList)


 const handlePlayMusic = async (index : number , data : any) => {
        const check = data.find(song => song.encodeId === item.encodeId)
        
        if(item.streamingStatus === 1){
                changePlay(true)
                if(check) {
                        addCurrentMusic(index , item.encodeId)
                        updatePlayList(false)
                        addIdPlayList(id)
                }else{
                        updatePlayList(true)
                        addQueue(detailPlaylist)
                        handlePlayMusic(index,detailPlaylist)
                }
       }else {
              alert("Bai hat la bai hat vip !!!")
        }
}


  const handleLikeSong = (e) => {
          e.preventDefault()
          if(!session){
                handleAlert('error', "Vui lòng đăng nhập để thích bài hát")
          }else{
                  setLike(true)
                  likedSongs.push(item)
                  profile[0].likedSongs = likedSongs
                  setProfile(profile)
                  setLike(true)
                  AddFavoriteSong(item,idUser)
                  handleAlert('success', "Đã thêm vào danh sách yêu thích")
          }      
   }

  const handleRemoveLikeSong = (e) => {
          e.preventDefault()
          setLike(false)
          const tmpArray = likedSongs.filter(song => song.encodeId !== item.encodeId)
          profile[0].likedSongs = tmpArray
          setProfile(profile)
          setLike(false)
          RemoveFavoriteSong(item.encodeId,idUser)
          handleAlert('success', "Đã xóa khỏi danh sách yêu thích")
  }

  const handleAddPlayList = () => {
        if(!session){
                handleAlert('error', "Vui lòng đăng nhập để thêm bài hát vào playlist")
        }else{
                const tmp = playList.data.find(song => song.encodeId === item.encodeId)
                if(tmp){
                        handleAlert('error', "Bài hát đã có trong playlist")
                }else{
                        playList.data.push(item)
                        router.push(`/PlayList/${idPlayList}`)
                        AddSongToPlayList(item,idPlayList,idUser)
                        handleAlert('success', "Đã thêm vào playlist")
                }
        }

  }

  const handleRemovePlayList = () => {
        playList.data =  playList.data.filter(song => song.encodeId !== item.encodeId)
        // console.log(tmp)
        // profile[0].playLists[Number(idPlayList - 1)].data = tmp
        setProfile(profile)
        router.push(`/PlayList/${idPlayList}`)
        RemoveSongOfPlayList(idPlayList,item.encodeId,idUser)
        handleAlert('success', "Đã xóa khỏi playlist")
  }


  useEffect(() =>{
        if(likedSongs?.find(song => song?.encodeId === item?.encodeId)){
                setLike(true)
        }
  }, [likedSongs?.length])

  return (    
      <li className = { `hover:bg-cyan-600 group  p-2 ${idSong == item.encodeId ? "bg-cyan-600" : ""}`}  >
        <div className = "text-white flex items-center cursor-pointer justify-between">
            <div className = "flex items-center gap-5 w-[26rem]">
                    <span className = "hidden group-hover:block ">
                             {
                                     
                                play &&  idSong  == item.encodeId ?  <i className='bx bx-pause text-base '></i>
                                : <i onClick={() => handlePlayMusic(index , queue)}  className='bx bx-play hidden text-base '></i>
                             }
                             
                               
                    </span>
                    <span className = "text-base group-hover:hidden ">{index}</span>
                    <div className = "flex items-center gap-5">
                          <img className = "w-11 h-11 rounded" src= {item.thumbnail} alt="" />
                        <div className = "flex items-start flex-col">
                                <span>{item.title}</span>
                                <span className = "text-sm font-semibold text-gray-300 flex items-center gap-10">
                                        {item.artistsNames}
                                </span>
                        </div>  
                               
                    </div>
            </div>

        {
                album &&
                <div className = "flex items-center w-1/3">
                        <div className = "mr-auto w-full text-sm text-gray-300 font-medium">{item.album?.title}</div>
                </div>
        }


        {
                canAdd ?
                <div>
                        <span onClick={() => handleAddPlayList()}  className = "rounded-2xl py-1 font-bold px-3 text-sm border-slate-100 border hover:scale-105" >Thêm</span>
                </div>
                : canDelete ?
                <span onClick = {() => handleRemovePlayList()} >X</span>:
                <div className = "flex items-center gap-3">
                        {
                                like ?
                                <span onClick = {(e) => handleRemoveLikeSong(e)} className = "hidden group-hover:block " >
                                        <i className='bx bxs-heart text-green-500 text-base'></i>
                                </span>
                                :
                                <span onClick = {(e) => handleLikeSong(e)} className = "hidden group-hover:block " >
                                        <i className='bx bx-heart text-base'></i>
                        </span>
                        }
                        {/* {item.streamingStatus === 2 && <span className = "text-[10px]">(Đây là bài hát vip)</span>} */}
                        <span className = " text-gray-300 text-sm  font-medium" >{CovertTime(item.duration)}</span>
                </div>
        }

        </div>
      </li>
  )
}

export default ListMusicTabItem