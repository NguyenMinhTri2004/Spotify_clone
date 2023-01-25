import Link from "next/link"
import { usePlayMusicStore } from '../../Zustand/Music/store'
import { AddPlayList , RemovePlayList } from "../../Utils/CustomApi/PlayList"
import { useSession } from "next-auth/react"
import { useProfileStore } from '../../Zustand/UserProfile/store'
import { handleAlert } from "../../Utils/Alert/handleAlert"
import { useRouter } from 'next/router'
import { useSlideStore } from "../../Zustand/Slide/store"
import Modal from "../Modal/Modal"
import { useThemeStore } from "../../Zustand/Theme/store"

const Sidebar = () => {

   const playLists = useProfileStore(state => state?.profile[0]?.playLists)

   const router = useRouter()

  const SlideBarArray = [

   {
      display : "Trang chủ",
      icon : 'bx bxs-home',
      link : "/"
   },

     {
        display : "Thư viện",
        icon : 'bx bx-library',
        link : "/Library/1"
     },

     {
        display : "Tạo playlist",
        icon : 'bx bxs-plus-square',
        link : `/PlayList/${playLists?.length + 1}`
     },

     {
        display : "Bài hát đã thích",
        icon : 'bx bxs-heart',
        link : "/FavoriteMusic"
     },

     {
         display : "Bảng xếp hạng",
         icon : "bx bxs-bar-chart-alt-2",
         link : "/Chart"
     }
  ]

  const thumbnailM = usePlayMusicStore(state => state?.thumbnailM)

  const idPlayList = usePlayMusicStore(state => state?.idPlayList)

  const open = usePlayMusicStore(state => state?.open)

  const addOpen = usePlayMusicStore((state) => state?.addOpen)

  const { data: session } = useSession()

  let profile = useProfileStore(state => state?.profile)

  const setProfile = useProfileStore(state => state?.setProfile)

  const openSlide = useSlideStore(state => state?.open)

  const setOpen = useSlideStore(state => state?.setOpen)

  const idUser = profile[0]?._id
  
  const darkMode = useThemeStore(state => state?.darkMode)

    const handleAddPlayList = (e) => {
      e.preventDefault()
      if(!session){
           handleAlert('error' , "Vui lòng đăng nhập để có thể tạo playlist")
      }else{
         const id = Math.random().toString(36).substring(2,9)
         const tmp = profile[0]?.playLists?.find(item => item.id === (id))
         if(!tmp) {
            const data = {
               id : id,
               name : `Danh sách phát của tôi #${profile[0]?.playLists?.length + 1}`,
               description : "",
               img : "",
               data : [],
               canChangeImage : true,
            }
            playLists?.push(data)
            profile[0].playLists = playLists
            setProfile(profile)
            AddPlayList(data , idUser)
            handleAlert('success' , "Tạo playlist thành công")
            router.push(`/PlayList/${id}`)
         }else{
            handleAddPlayList(e)
         }
      }
    }

    const handleRemovePlaylist = (id) => {
      const tmp = profile[0].playLists.filter(item => item.id !== id)
      profile[0].playLists = tmp
      setProfile(profile)
      RemovePlayList(id , idUser)
      handleAlert('success' , "Xóa playlist thành công")
    }

   //  const handle

  return (
    <div className={`bg-black w-[18rem] h-full  min-w-[15rem] max-w-[18rem]  overflow-hidden z-[999] md:relative ${openSlide ? 'left-0' : 'left-[-100%]'} absolute md:left-[0] ease-in-out duration-500`}>
                <ul className = " border-b border-solid border-slate-50 px-3 mt-10">

                   {
                       SlideBarArray?.map((item , index) => {
                           return (
                              <Link onClick = {() => setOpen(false)} href = {item?.link}  key = {index}>
                                 <li onClick = {() => setOpen(false)} className="text-gray-300 cursor-pointer font-semibold flex items-center justify-between gap-4 p-2 text-base hover:text-white ease-in-out duration-500">
                                    <div className = "flex items-center gap-4">
                                          <i className= {`${item?.icon} text-2xl`}></i>
                                          {
                                             item?.display === "Tạo playlist" ?
                                             <p onClick={(e) => handleAddPlayList(e)} >{item?.display}</p>
                                             :
                                             <p>{item?.display}</p>
                                          }
                                    </div>
                                 </li>      
                              </Link>
                           )
                       })
                   }


                     <li  className="text-gray-300 cursor-pointer font-semibold  items-center justify-between gap-4 p-2 text-base hover:text-white ease-in-out duration-500 flex md:hidden" >
                              <div className = "flex items-center gap-4">
                                                <Link href = "/Search/explore">
                                                      <i className='bx bx-search text-2xl'></i>
                                                </Link>
                                                      <p>Tìm kiếm</p>
                                                   
                             </div>
                              
                     </li>
                </ul>
                <ul className = " hover:overflow-y-scroll h-full" >
                   {
                          profile[0]?.playLists?.length > 0
                          &&
                          profile[0]?.playLists?.map((item , index) => {
                                return (
                                    
                                       <li key = {index} className = "text-gray-300 cursor-pointer font-semibold flex items-center justify-between gap-4 px-3 py-2 text-sm hover:text-white ease-in-out duration-500">
                                          <Link href = {`/PlayList/${item?.id}`}>
                                                <p>{item?.name}</p>
                                          </Link>
                                                <i onClick = {() => handleRemovePlaylist(item?.id)} className='bx bx-x text-base'></i>
                                       </li>       
                                )
                          })
                   }
                </ul>
                 <span className = {`absolute ${open ? "bottom-20" : "bottom-[-14rem]"}  w-full  group text-white duration-500`}>
                    <span className = 'relative'>
                        <span className = 'opacity-100 cursor-pointer rounded-full w-6 h-6 absolute right-[5px] top-[5%] bg-neutral-800/80 flex items-center justify-center hover:scale-110 ease-in-out duration-300 hover:bg-neutral-800/90 group-hover:opacity-100 '>
                           <i onClick = {() => addOpen(false)} className='bx bx-chevron-down text-2xl hover:text-white'></i>
                        </span>
                        <Link href = {`/Detail/${idPlayList}`}>
                              <img className = "cursor-pointer" src= {thumbnailM} alt="" />
                        </Link>
                    </span>
                 </span>
                 {/* {
                     openSlide && <Modal/>
                 } */}
    </div>
  )
}

export default Sidebar