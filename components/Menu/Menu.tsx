import React , {useState, useEffect , useRef ,SyntheticEvent } from 'react'
import LyricsIcon from '@mui/icons-material/Lyrics'
import { usePlayMusicStore } from '../../Zustand/Music/store'
import { getMusicByIndex } from '../../Utils/Music/GetMusic'
import { AddFavoriteSong, GetSong, RemoveFavoriteSong } from "../../Utils/CustomApi/Music"
import { AxiosResponse } from 'axios';
import { CovertTime } from '../../Utils/Time/CovertTime'
import Link from "next/link"
import { useProfileStore } from '../../Zustand/UserProfile/store'
import { handleAlert } from '../../Utils/Alert/handleAlert'
import { useSession } from 'next-auth/react'
import { useLoadingStore } from '../../Zustand/Loading/store'

const Menu = () => {
      
  const [random , setRandom] = useState(false)

  const [replay , setReplay] = useState(false)

  const [infoSong , setInfoSong] = useState<any>()

  const changeMode = useLoadingStore(state => state?.changeMode)

  const data = usePlayMusicStore(state => state?.playList)

  const queue = usePlayMusicStore(state => state?.queue)

  let profile =  useProfileStore (state => state?.profile)
  
  let indexPlayMusic = usePlayMusicStore(state => state?.indexPlayMusic)

  const audio = useRef<HTMLAudioElement>(null)

  const [progress , setProgress] = useState(0)

  const [play , setPlay] = useState(false)

  const [mute , setMute] = useState(false)

  const [played , setPlayed] = useState(0)

  const [playMusic, setPlayMusic] = useState<AxiosResponse | null | void>(null)

  const length = queue?.length
  
  const addThumbnailM = usePlayMusicStore(state => state?.addThumbnailM)

  const addCurrentMusic = usePlayMusicStore((state) => state?.addCurrentMusic)

  const addOpen = usePlayMusicStore((state) => state?.addOpen)

  const open = usePlayMusicStore(state => state?.open)

  const likedSongs =  useProfileStore (state => state?.profile[0]?.likedSongs)
  
  const idUser = profile[0]?._id

  const getCurrentMusic = async (data:any) => {
       if (data.length > 0){
             const item = await getMusicByIndex(data , indexPlayMusic)
             if(item?.streamingStatus === 1){
                   setInfoSong(item)
                   addThumbnailM(item?.thumbnailM)
                   changeMode(true)
                   const result = await GetSong(item?.encodeId)
                   setPlayMusic(result)
                   changeMode(false)
                   if(audio.current && playMode){
                               audio.current.src = result?.data?.['128']
                               audio?.current?.load()
                               audio?.current?.play()
                               setPlay(true)  
                         
                    }
             }else{
                 handleNext()
             }
       }else{
            getCurrentMusic(data)
       }
  } 

  const idSong =  usePlayMusicStore(state => state?.idSong)

  const idPlayList = usePlayMusicStore(state => state?.idPlayList)

  const [like , setLike] = useState(false)

  const playMode = usePlayMusicStore(state => state?.play)

  const updateCurrentTime = usePlayMusicStore(state => state?.updateCurrentTime)
  
  const changePlayList = usePlayMusicStore(state => state?.changePlayList)

  const { data: session } = useSession()


 useEffect(() => {  
      if(changePlayList === true){
            if(data.length > 0){
                  getCurrentMusic(data)
            }
       }else{

            if(queue.length > 0){
                  getCurrentMusic(queue)
            }
       }

       if(likedSongs?.find(song => song?.encodeId === idSong)){
            setLike(true)
       }else{
            setLike(false)
       }

       if(playMode === false) {
            audio?.current?.pause()
            setPlay(false)
       }else{
            audio?.current?.play()
            setPlay(true)
       }

}, [idSong , like , playMode, changePlayList , likedSongs?.length , playMusic?.data?.['128'] ])

      


const handleRandom = () => {
      if(audio?.current){
            let newIndex 
            do {
                newIndex = Math.floor(Math.random() * length)
            }while(newIndex === indexPlayMusic)

            const nameSong = getMusicByIndex(queue , newIndex)
            addCurrentMusic(newIndex, nameSong?.encodeId)
      }
}

const handleReplay = () => {
      if(audio.current){
            setReplay(!replay)
            if(replay){
                  audio.current.loop = false
            }else {
                  audio.current.loop = true
            }
            audio.current.play()
      }
}


const handlePlayMusic = () => {
      setPlay(!play)
      if(play){
            audio?.current?.pause()
      }else {
            audio?.current?.play()

      }
}

     
  const handlePrev = () => {
      if(indexPlayMusic == 0){
            const nameSong = getMusicByIndex(queue , length - 1)
            addCurrentMusic(length - 1  , nameSong?.encodeId)
       }else {
            const nameSong = getMusicByIndex(queue , indexPlayMusic - 1 ) 
            addCurrentMusic(indexPlayMusic - 1 , nameSong?.encodeId)
       }    
  }

  const handleNext = async () => {  
        if(indexPlayMusic == length - 1 ){
             const nameSong = getMusicByIndex(queue , 0)
             addCurrentMusic(0 , nameSong?.encodeId) 
        }else {
             const nameSong = getMusicByIndex(queue , indexPlayMusic + 1)
             addCurrentMusic(indexPlayMusic + 1 , nameSong?.encodeId)
        }    
  }

  const handlePerCent = (e: SyntheticEvent<HTMLAudioElement>) => {
            if(audio.current){
                const progressPercent = Math.floor(audio.current.currentTime / audio.current.duration * 100)
                setProgress(progressPercent)
                setPlayed(Math.floor(audio.current.currentTime))
                updateCurrentTime(audio.current.currentTime)  
            }
        
  }

  const handleChangeInput = (e) => {
      if(audio.current){
            const seekTime = audio.current.duration / 100 *e.target.value
            audio.current.currentTime = seekTime     
      }
  }

  const handleEnded = (e) => {
            if(random){
                  handleRandom()
            }else {
                  handleNext()
            }
  }

  const handleChangeVolume = (e) => {
      if(audio.current){
            const volume = e.target.value/100
            audio.current.volume = volume
            if(volume === 0){
                  setMute(true)
            }else{
                  setMute(false)
            }
      }
  }

  
  const handleLikeSong = (e) => {
      e.preventDefault()
      if(!session){
            handleAlert('error', "Vui lòng đăng nhập để thích bài hát")
      }else{
            setLike(true)
            likedSongs.push(infoSong)
            profile[0].likedSongs = likedSongs
            AddFavoriteSong(infoSong,idUser)
            handleAlert('success', "Đã thêm vào danh sách yêu thích")
      }      
}

const handleRemoveLikeSong = (e) => {
      e.preventDefault()
      setLike(false)
      const tmpArray = likedSongs.filter(song => song.encodeId !== infoSong.encodeId)
      profile[0].likedSongs = tmpArray
      RemoveFavoriteSong(infoSong.encodeId,idUser)
      handleAlert('success', "Đã xóa khỏi danh sách yêu thích")
}


  return (  
    
    <div className = "w-screen bg-stone-900 px-5 fixed bottom-0 py-1 z-[9999999999]">
        <div className = "flex items-center justify-between w-full text-gray-300 text-sm py-2 ">
            <div className = {` flex items-center gap-4 relative  md:w-[22%] w-[5rem]  overflow-hidden ${open ? "-translate-x-[5.4rem]" : ""} ease-in-out duration-300`} >
                
                        <span className = {`overflow-hidden relative w-16  cursor-pointer group  `}>
                              {
                                    !open  && <span className = " opacity-0 rounded-full w-6 h-6 absolute right-[5px] top-[10%] bg-neutral-800/80 flex items-center justify-center hover:scale-110 ease-in-out duration-300 hover:bg-neutral-800/90 group-hover:opacity-100">
                                                  <i onClick = {() => addOpen(true)} className='bx bx-chevron-up text-2xl hover:text-white'/>
                                            </span>
                              }
                              <Link href = {`/Detail/${idPlayList}`}>
                                  <img className = {``} src= {infoSong?.thumbnail} alt=""/>
                              </Link>  
                        </span>
                 

                  <div className = "max-w-[14rem]  lg:block md:block sm:block hidden">
                          {
                              infoSong?.title?.length > 30 ?
                              <p className="text-white font-bold mb-1 overflow-hidden w-full">{infoSong?.title?.slice(0,22) +'.....'}</p>
                              :
                              <p className="text-white font-bold mb-1 overflow-hidden w-full">{infoSong?.title}</p>
                          }
                          <p className = "text-xs">{infoSong?.artistsNames}</p>

                  </div>

                  <div>
                        {
                              like ?
                              <i  onClick={(e) => handleRemoveLikeSong(e)} className='bx bxs-heart text-green-500 cursor-pointer hover:text-white ease-in-out duration-500 text-xl'></i>
                              :
                             <i onClick={(e) => handleLikeSong(e)} className='bx bxs-heart cursor-pointer hover:text-white ease-in-out duration-500 text-xl'></i>
                        }
                  </div>

                  

            </div>

            <div className = "flex flex-col items-center justify-center md:w-[40%] w-[10rem]">
                  <div className = "flex items-center gap-5 w-full justify-center text-base md:text-xl cursor-pointer mb-1 ">
                        <i className= {`bx bx-transfer-alt cursor-pointer hover:text-white ease-in-out duration-500 ${random ? 'text-green-400' : " "  }`} onClick={() => setRandom(!random)}></i>
                        <i className='bx bxs-left-arrow cursor-pointer hover:text-white ease-in-out duration-500' onClick={() => handlePrev()}></i>
                        <span className = "bg-white rounded-full p-1 text-black flex items-center justify-center cursor-pointer" onClick={() => handlePlayMusic()}>
                           {
                              play ?  <i className='bx bx-pause md:text-2xl text-xl'></i>
                              : <i className='bx bx-play md:text-2xl text-xl' ></i>
                           } 
                        </span>
                        <i className='bx bxs-right-arrow cursor-pointer  hover:text-white ease-in-out duration-500' onClick={() => handleNext()}></i>
                        <i className= {`bx bx-repeat cursor-pointer hover:text-white ease-in-out duration-500 ${replay ? 'text-green-400' : " "  } `} onClick={() => handleReplay()}></i>
                  </div>

                  <div className = "flex items-center justify-center gap-3 w-full">
                      <span className = "text-[11px]">{CovertTime(played)}</span>
                         <input onChange = {(e) => handleChangeInput(e)} className = "w-full h-1 in-range:bg-red-300 out-of-range:bg-blue-700 " type = "range" value = {progress}  step="1" min="0" max="100"/>
                      <span className = "text-[11px]">{CovertTime(infoSong?.duration)}</span>
                  </div>
            </div>

            <div className = "flex items-center gap-3 md:w-[12%] w-[6rem]">
                  <Link href = {`/Lyric/${idSong}`}>
                     <LyricsIcon  className = "cursor-pointer hover:text-white ease-in-out duration-500  "   />
                  </Link>
                 {
                    mute ? <i className='bx bx-volume-mute cursor-pointer hover:text-white ease-in-out duration-500'></i>:
                    <i className='bx bx-volume-full cursor-pointer hover:text-white ease-in-out duration-500'></i>
                 }
                 
                 <input step="1" min="0" max="100" className='w-full h-1' type='range' onChange={(e) => handleChangeVolume(e)}/>
            </div>

            
             <audio  className = "hidden" ref = {audio} controls onTimeUpdate = {(e) => handlePerCent(e)} onEnded = {(e) => handleEnded(e)} >
                     {
                        <source  type="audio/mpeg"/>    
                     }    
             </audio>
             

        </div>

    </div>
  )
}

export default Menu