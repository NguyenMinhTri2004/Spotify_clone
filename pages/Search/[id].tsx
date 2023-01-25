import React , {useState , useEffect} from 'react'
import Link from "next/link"
import SectionTitle from '../../components/Section/SectionTittle'
import SectionBody from '../../components/Section/SectionBody'
import { GetDetailPlaylist, GetSearchSong } from '../../Utils/CustomApi/Music'
import { AxiosResponse } from 'axios'
import { useRouter } from 'next/router'
import ListMusicTab from '../../components/Music/ListMusicTab'
import ListMusic from '../../components/Music/ListMusic'
import { usePlayMusicStore } from '../../Zustand/Music/store'
import {useLoadingStore} from "../../Zustand/Loading/store"


const Search = () => {

  const router = useRouter()
  
  const { id } = router.query
 
  const [dataSearch, setDataSearch] = useState<AxiosResponse | null | void>(null)

  const [playList, setPlayList] = useState<AxiosResponse | null | void>(null);

  const addPlayList = usePlayMusicStore(state => state?.addPlayList)

  const addQueue = usePlayMusicStore((state) => state?.addQueue)

  const changeMode = useLoadingStore(state => state?.changeMode)

  const addCurrentMusic = usePlayMusicStore((state) => state?.addCurrentMusic)

  const detailPlaylist = usePlayMusicStore(state => state?.playList)

  const changePlay = usePlayMusicStore(state => state?.changePlay)

  const updatePlayList = usePlayMusicStore(state => state?.updatePlayList)

  useEffect(() =>{
       const getData = async () => {
         changeMode(true)
         const data = await GetSearchSong(id)
         setDataSearch(data)
         if( data?.data?.top){
              const playList = await GetDetailPlaylist(data?.data?.playlists[0]?.encodeId + "")
              setPlayList(playList)
              addPlayList(playList?.data?.song?.items)
         }else{
               addPlayList(data?.data?.songs)
         }
       
         changeMode(false)
       }

       getData()
  }, [id])


  const handlePlayMusic = async (index : number , data : any , item : any) =>{
      const check = data.find(song => song?.encodeId === item?.encodeId)
      if(item?.streamingStatus === 1){
              changePlay(true)
              if(check) {
                      addCurrentMusic(index , item?.encodeId)
                      updatePlayList(false)
              }else{
                      updatePlayList(true)
                      addQueue(detailPlaylist)
                      handlePlayMusic(index,detailPlaylist,item)
              }
     }else {
            alert("Bai hat la bai hat vip !!!")
      }
}

  return (
    <div>
        <div className = "flex-col flex md:flex-row items-start gap-8 p-2 w- mb-5">
              {
                    dataSearch?.data?.top
                    &&
                    <div className = "w-full md:w-1/3">
                      <SectionTitle>
                          <span className = "text-bold text-2xl" >Kết quả hàng đầu</span> 
                      </SectionTitle>

                      <SectionBody className ="bg-red-700">
                        {
                           dataSearch?.data?.top?.objectType === "song" ?

                                <div onClick = {() => handlePlayMusic(0,playList?.data?.song?.items,playList?.data?.song?.items[0])} className = "bg-stone-900 hover:bg-stone-800 ease-in-out duration-500 rounded-lg cursor-pointer relative group">
                                    <div className = "flex-col flex gap-3 text-white p-5">
                                      <img className = "w-24" src= {dataSearch?.data?.top?.thumbnail} alt="" />
                                      <span className = "text-3xl font-bold">{dataSearch?.data?.top?.name}</span>
                                      <span className = "text-3xl font-bold">{dataSearch?.data?.top?.title}</span>
                                      <span className = "flex gap-5">
                                    { dataSearch?.data?.top?.artistsNames  &&    <span className = "text-gray-300 text-sm font-bold">
                                                {dataSearch?.data?.top?.artistsNames}
                                          </span>
                                    }
                                          <span className = "text-white">
                                                { 
                                                  dataSearch?.data?.top?.objectType === "song" ? 
                                                  <span className = "py-1 px-2 rounded-md bg-black font-bold">Bài hát</span>
                                                  : <span className = "py-1 px-2 rounded-md bg-black font-bold" >Nghệ sĩ</span>
                                                }
                                          </span>
                                      </span>
                                    </div>

                                    <span className = "group-hover:translate-y-0 group-hover:opacity-100 opacity-0 translate-y-1.5 bg-green-500 rounded-full p-2 text-black flex items-center justify-center cursor-pointer absolute top-[42%] right-6">
                                        <i className='bx bx-play text-4xl'></i>
                                   </span>

                                </div>
                          :
                          <Link href= {`/Artist/${dataSearch?.data?.top?.alias}`}>
                              <div className = "bg-stone-900 hover:bg-stone-800 ease-in-out duration-500 rounded-lg cursor-pointer relative group">
                                  <div className = "flex-col flex gap-3 text-white p-5">
                                    <img className = "w-24" src= {dataSearch?.data?.top?.thumbnail} alt="" />
                                    <span className = "text-3xl font-bold">{dataSearch?.data?.top?.name}</span>
                                    <span className = "text-3xl font-bold">{dataSearch?.data?.top?.title}</span>
                                    <span className = "flex gap-5">
                                  { dataSearch?.data?.top?.artistsNames  &&    <span className = "text-gray-300 text-sm font-bold">
                                              {dataSearch?.data?.top?.artistsNames}
                                        </span>
                                  }
                                        <span className = "text-white">
                                              { 
                                                dataSearch?.data?.top?.objectType === "song" ? 
                                                <span className = "py-1 px-2 rounded-md bg-black font-bold">Bài hát</span>
                                                : <span className = "py-1 px-2 rounded-md bg-black font-bold" >Nghệ sĩ</span>
                                              }
                                        </span>
                                    </span>
                                  </div>


                                  <span className = "ease-in-out duration-500   group-hover:translate-y-0 group-hover:opacity-100 opacity-0 translate-y-1.5 bg-green-500 rounded-full p-2 text-black flex items-center justify-center cursor-pointer absolute top-[42%] right-6">
                                        <i className='bx bx-play text-4xl'></i>
                                 </span>

                              </div>
                          </Link>   
                        }
                      </SectionBody>
                    </div>
              }
              

              {
                 dataSearch?.data?.songs
                 &&
                 <div className = "md:w-2/3 w-full">
                      <SectionTitle>
                            <span className = "text-bold text-2xl" >Bài hát</span> 
                      </SectionTitle>

                      <SectionBody>
                              <ListMusicTab
                                    data = {playList?.data?.song?.items?.slice(0,4)}
                                    number = {4}
                                    big = {false}
                                    album = {false}
                              />
                      </SectionBody>
              </div>
              }

             
        </div>

        {
              dataSearch?.data?.artists
              &&
              <div>
                   <SectionTitle>
                          Nghệ sĩ
                  </SectionTitle>

                  <SectionBody>
                        <ListMusic
                              items = {dataSearch?.data?.artists}
                              all = {false}
                              artist = {true}
                          />
                  </SectionBody>
              </div>
        }
         
         {
              dataSearch?.data?.playlists
              &&
              <div>
                 <SectionTitle>
                       Playlist     
                 </SectionTitle>

                <SectionBody>
                        <ListMusic
                            items = {dataSearch?.data?.playlists}
                            all = {false}
                        />
                </SectionBody>
              </div>
         }

        
    </div>
  )
}

export default Search

