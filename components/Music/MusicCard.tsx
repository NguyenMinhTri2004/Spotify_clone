import React from 'react'
import Link from "next/link"
import { RemoveFavoriteArtist } from '../../Utils/CustomApi/Artist'
import { useProfileStore } from '../../Zustand/UserProfile/store'
import { RemovePlayList } from '../../Utils/CustomApi/PlayList'
import { handleAlert } from '../../Utils/Alert/handleAlert'
import { usePlayMusicStore } from '../../Zustand/Music/store'
import { GetDetailPlaylist } from '../../Utils/CustomApi/Music'
import { MusicCardType } from '../../Types'


const MusicCard = ({item , artist , canDelete , playList} :any) => {

  let profile = useProfileStore(state => state?.profile)

  const idUser = profile[0]?._id

  const likedArtists = useProfileStore(state => state?.profile[0]?.likedArtists)

  const setProfile = useProfileStore(state => state?.setProfile)

  const addPlayList = usePlayMusicStore(state => state?.addPlayList)

  const addCurrentMusic = usePlayMusicStore((state) => state?.addCurrentMusic)

  const updatePlayList = usePlayMusicStore(state => state?.updatePlayList)

  const handleRemoveLikeArtist = (e) => {
    e.preventDefault()
    const tmpArray = likedArtists.filter(song => song.id !== item.id)
    profile[0].likedArtists = tmpArray
    setProfile(profile)
    RemoveFavoriteArtist(item.id , idUser)
    handleAlert('success' , "Xóa nghệ sĩ thành công")
  }


  const handleRemovePlaylist = (e) => {
    e.preventDefault()
    const tmp = profile[0].playLists.filter(playList => playList.id !== item.id)
    profile[0].playLists = tmp
    setProfile(profile)
    RemovePlayList(item.id , idUser)
    handleAlert('success' , "Xóa playlist thành công")
  }

  const handlePlayList = async (e) => {
    e.preventDefault()
    const data = await GetDetailPlaylist(item.encodeId + "")
    await addPlayList(data?.data?.song?.items)
    updatePlayList(true)
    addCurrentMusic(0 , data?.data?.song?.items[0].encodeId)
  }


  return (
  <Link href = {artist ? `/Artist/${item?.alias}` : playList ?  `/PlayList/${item?.id}` : `/Detail/${item?.encodeId}`  }  >
    <div className={`cursor-pointer shadow-2xl w-48 rounded-lg group hover:bg-stone-700 bg-stone-800  h-72 overflow-y-hidden relative ease-in-out duration-500 overflow-hidden`}>
             {
                canDelete &&
                <div className="flex item-center justify-end">
                    <i onClick = {artist ?  (e) => handleRemoveLikeArtist(e) : (e) => handleRemovePlaylist(e)}  className='group-hover:translate-y-0 group-hover:opacity-100 opacity-0 translate-y-1.5  bx bx-x text-white text-xl mt-1'></i>
                </div>
             }
        <div className="text-gray-300 p-4 flex flex-col items-center gap-3  ">

             {
                  artist ?
                  <img className = 'h-[160px] rounded-full' src= {item?.thumbnailM} alt="" />
                  : playList ?
                  <div className ={`${item?.img === "" && 'bg-stone-500 p-[50px] h-[160px]' }`}>
                         {
                             item.img ?
                             <img className = 'h-[160px]' src= {item?.img} alt="" /> :
                             <div className = {`h-[80px] flex items-center justify-center shadow-2xl  `}>
                                             <i className={`bx bx-music text-white text-6xl`}></i>
                            </div>
                         }
                    
                  </div>:
                
                  <img className = 'max-h-52' src= {item?.thumbnailM} alt="" />
             }
            <div className = "w-full flex flex-col">
                  <p className = "text-white font-bold h-8">
                    {
                         artist ? 
                         <span>{item.alias.length > 15 ? item.alias.slice(0,15) + "..." : item.alias}</span>:
                         playList ?
                         <span>{item.name?.length > 15 ? item.name.slice(0,15) + "..." : item.name}</span> :
                         <span>{item.title?.length > 15 ? item.title.slice(0,15) + "..." : item.title}</span>
                         
                    }
                  </p>
                  <p className = "text-sm mt-auto">
                      {
                         artist ?
                         <span className = "font-bold mb-3">Nghệ sĩ</span>:
                         playList ?
                         <span className='font-medium text-neutral-400'>Của {profile[0]?.name}</span>:
                         <span className='font-medium text-neutral-400'>{item?.sortDescription?.length > 30 ? item.sortDescription.slice(0,40) + "..." : item.sortDescription}</span>
                         
                      }
                  </p>
            </div> 
        </div>

        <span onClick={(e) => handlePlayList(e)} className = "group-hover:translate-y-0 group-hover:opacity-100 opacity-0 translate-y-1.5 bg-green-500 rounded-full p-2 text-black flex items-center justify-center cursor-pointer absolute top-[42%] right-6 ease-in-out duration-500   ">
             <i className='bx bx-play text-4xl'></i>
        </span>
    </div>
  </Link>  
  )
}

export default MusicCard

