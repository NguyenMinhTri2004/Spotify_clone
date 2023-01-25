
import Tittle from "../../components/Tittle/Tittle"
import {useEffect, useState} from "react"
import ListMusicTab from "../../components/Music/ListMusicTab"
import { usePlayMusicStore } from "../../Zustand/Music/store"
import { GetSearchSong } from "../../Utils/CustomApi/Music"
import { AxiosResponse } from "axios"
import { useRouter } from "next/router"
import { usePlaylistStore } from "../../Zustand/PlayList/store"
import { useProfileStore } from "../../Zustand/UserProfile/store"
import Modal from "../../components/Modal/Modal"
import DetailPlayList from "../../components/Modal/DetailPlayList"
import shallow from 'zustand/shallow'
import { useThemeStore } from "../../Zustand/Theme/store"

const Playlist = () => {

    const [open , setOpen] = useState(false)

    const [openModal , setOpenModal] = useState(false)

    const data = usePlayMusicStore(state => state?.playList)

    const [search , setSearch] = useState("")

    const [dataSearch, setDataSearch] = useState<AxiosResponse | null | void>(null)

    const setIdPlayList = usePlaylistStore(state => state?.setIdPlayList)

    const addPlayList = usePlayMusicStore(state => state?.addPlayList)

    const queue = usePlayMusicStore(state => state?.queue)

    const handleOnChange = (e) => {
        setSearch(e.target.value)
    }

    useEffect(() =>{
        const getData = async () => {
          const data = await GetSearchSong(search)
          setDataSearch(data)
        }
 
        getData()
   }, [search])

   const router = useRouter()
   
   const id = router?.query?.id
   
   const darkMode = useThemeStore(state => state?.darkMode)


   const playList = useProfileStore(state => state?.profile[0]?.playLists?.find(item => item?.id === (id)),shallow)

   useEffect(() => {
    setIdPlayList(id)
    addPlayList(playList?.data)
   },[playList?.length, id])



    return (
        <main className = {`bg-stone-700 h-full`} >
            <div className="wrapper flex items-center h-[95%] p-5 gap-5">
                <div className = { `${darkMode ? "bg-stone-900" : "bg-[#170f23]" } w-full h-full rounded-lg`}>
                    <div className = "bg-stone-700">
                        <Tittle
                            subtitle = "Danh sách phát công khai"
                            title = {playList?.name}
                            icon = "bx bx-music"
                            fontsize = {"text-[2rem]"}
                            color ="from-stone-900"
                            subcolor ="to-stone-800"
                            menu = {false}
                            description = {playList?.description ? playList.description : false}
                            PlayList = {true}
                            openModal = {openModal}
                            setOpenModal = {setOpenModal}
                            img = {playList?.img ? playList.img : false}
                            canChangeImage = {playList?.canChangeImage}
                        />
                    </div>
                 <div className = "w-[95%] ml-auto mr-auto">
                        <div className="flex gap-5 text-gray-300 text-4xl   border-slate-50 py-6">
                            <i className='bx bx-user-plus cursor-pointer pb-5' ></i>
                            <i className='bx bx-dots-horizontal-rounded cursor-pointer pb-5' ></i>
                        </div>
                        
                            <ListMusicTab 
                                            data = {playList?.data}
                                            big = {true}
                                            album = {true}
                                            canAdd = {false}
                                            canDelete = {true}
                    
                            />
                        
                     {
                         open ? 
                              <div className='py-5 text-gray-300 '>
                                   <p onClick={() => setOpen(false)} className=' text-white flex justify-end text-sm font-bold cursor-pointer'>TÌM THÊM</p>
                                   <p className = "text-white text-2xl font-bold">Đề xuất</p>
                                   <p className = "text-sm mt-3 mb-3">Dựa trên tiêu đề của danh sách phát này</p>
                                   <ListMusicTab 
                                        data = {queue?.length > 0 && queue}
                                        big = {false}
                                        album = {true}
                                        canAdd = {true}
                                    />
                              </div>
                            :
                            <div>
                                <div className='flex items-center justify-between py-5 '>
                                    <div className='w-[34rem]'>
                                        <p className = "text-white text-xl font-bold mb-5">Hãy cùng tìm nội dung cho danh sách phát của bạn</p>
                                        <div className = "relative">
                                            <i className='bx bx-search absolute text-white right-2 top-[30%] text-2xl'></i>
                                            <input  onChange={(e) => handleOnChange(e)}   placeholder="Tìm kiếm bài hát"  className="rounded-xl text-white p-3 w-full bg-neutral-800 outline-none" />
                                        </div>
                                    </div>
                                    <i  onClick={() => setOpen(true)} className='bx bx-x text-gray-300 text-5xl cursor-pointer'></i>
                                </div>

                                <ListMusicTab 
                                        data = {dataSearch?.data?.songs}
                                        big = {false}
                                        album = {true}
                                        canAdd = {true}
                                />
                            </div>
                           
                     }
                 </div>

                </div>
            </div>
            {
                openModal &&
                <Modal setOpenModal = {setOpenModal}>
                    <DetailPlayList openModal = {openModal} setOpenModal = {setOpenModal} data = {playList}/>
                </Modal>
            }
        </main>
      )
}

export default Playlist