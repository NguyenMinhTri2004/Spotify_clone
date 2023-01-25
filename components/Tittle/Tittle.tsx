import React from 'react'
import { CovertTimeTitle } from '../../Utils/Time/CovertTime'
import MenuTitle from '../../components/Menu/MenuTitle'
import { useProfileStore } from '../../Zustand/UserProfile/store'
import { UpdatePlayList } from '../../Utils/CustomApi/PlayList'
import router from 'next/router'
import { handleAlert } from '../../Utils/Alert/handleAlert'
import { usePlaylistStore } from '../../Zustand/PlayList/store'

const Tittle = ({subtitle  , proFile,  title , description ,icon , fontsize , color , subcolor ,img , songLength ,timeTotal ,likeNum , listenNum , finalcolor , artist , follow , menu , PlayList  , setOpenModal,  canChangeImage } : any) => {


  let profile =  useProfileStore (state => state?.profile)

  const idMyPlaylist = usePlaylistStore (state => state?.idMyPlayList)

  const idUser = profile[0]?._id 

  const likedArtists = useProfileStore(state => state?.profile[0]?.likedArtists)

  const playList = useProfileStore(state => state?.profile[0]?.playLists)


  const handleDeleteImage = () => {
          const index = profile[0].playLists.findIndex(item => item.id === idMyPlaylist)
          profile[0].playLists[index].img = ''
          UpdatePlayList(idMyPlaylist ,idUser,profile[0].playLists[index])
          router.push(`/PlayList/${idMyPlaylist}`)
          handleAlert('success','Chỉnh sửa thành công')
  }
      
  return (

     <div className="flex flex-col justify-center h-full">
          {
               artist ?
               <div style={{backgroundImage : `url(${img})`}}  className = {` h-80 flex flex-col  bg-cover bg-center relative bg-no-repeat`}>
                    <div className="absolute w-full h-full bg-zinc-900/70"></div>
                    <div className="flex items-center justify-start gap-5 p-7">
                         <div className = "h-[50%] flex flex-col text-white font-bold justify-between z-10 ">
                              
                                   <span className = "text-sm hidden items-center gap-1  md:flex ">
                                         <i className='bx bxs-badge-check text-blue-500 text-2xl'></i>
                                        {subtitle}
                                   </span>

                                   <span className = {fontsize}>
                                        {title}
                                   </span>

                              <div className = "ml-2">
                                    <span className = "text-base" >{follow} lượt theo dõi</span>
                              </div>     

                         </div>
                    </div>
               </div>  
               :
               <div className = {`bg-gradient-to-b ${color} ${subcolor}  h-full flex flex-col  bg-no-repeat `}>
                         <div className="flex items-end justify-center gap-8 p-7 h-full">
                              {
                                   img ? <div style={{backgroundImage : `url(${img})`}}  className = {` ${proFile ? 'rounded-full' : ''}  md:w-[25%] w-[70%] h-[full] flex items-center justify-center shadow-2xl bg-no-repeat bg-contain`}>
                                         {
                                                  canChangeImage ? 
                                                  <div  className = {`relative `}>
                                                       {
                                                            proFile ?
                                                            <div onClick = {() => setOpenModal(true)} className = {`w-60 h-60 flex items-center justify-center shadow-2xl bg-gradient-to-b ${color} group ${subcolor}`}>
                                                                      <i className={`${icon} text-white text-6xl group-hover:hidden `}></i>
                                                                      <div className = "hidden group-hover:translate-y-0 group-hover:block ">
                                                                           <div className = "flex items-center flex-col cursor-pointer">
                                                                                     <i className='bx bx-pencil text-white text-6xl hidden'></i>
                                                                                     <span className = "text-white font-bold">Chọn ảnh</span>
                                                                           </div>
                                                                      </div>
                                                            </div>:
                                                            <div className = {`relative `} >
                                                                 <i onClick = {() => handleDeleteImage()} className='bx bx-x absolute top-0 right-0 text-2xl text-white font-bold cursor-pointer'></i>
                                                                 <img className = "rounded-full" src= {img} alt="" /> 

                                                            </div>

                                                       }
                                                  </div>:
                                                   <img className = "min-w-[50px]" src= {img} alt="" />
                                                  
                                         }
                                        </div>
                                        :
                                        <div className = "md:w-[29%] w-[100%] min-w-[60px] h-60">
                                             {
                                                  canChangeImage ? 
                                                  <div onClick = {() => setOpenModal(true)} className = {`md:w-[100%] w-[100%] min-w-[60px] h-60 flex items-center justify-center shadow-2xl bg-gradient-to-b ${color} group ${subcolor}`}>
                                                            <i className={`${icon} text-white text-6xl group-hover:hidden `}></i>
                                                            <div className = "hidden group-hover:translate-y-0 group-hover:block ">
                                                            <div className = "flex items-center flex-col cursor-pointer">
                                                                      <i className='bx bx-pencil text-white text-6xl hidden'></i>
                                                                      <span className = "text-white font-bold">Chọn ảnh</span>
                                                            </div>
                                                            </div>
                                                   </div>:
                                                       <div className = {`md:w-[100%] w-[100%]   min-w-[60px] h-60 flex items-center justify-center shadow-2xl bg-gradient-to-b ${color} group ${subcolor}`}>
                                                                 <i className={`${icon} text-white text-6xl`}></i>
                                                       </div>
                                             }
                                        </div>
                                        
                              }  
                                        


                              <div className = "h-full flex  flex-col gap-5 text-white font-bold justify-center w-full ">
                                   
                                        <span className = "text-sm hidden sm:block w-full">
                                             {subtitle}
                                        </span>

                                        <span className = {`${fontsize} lg:text-7xl  w-full`}>
                                             {title}
                                        </span>

                                        {
                                             description &&
                                             <span>
                                                  {description}
                                             </span>
                                        }

                                   <div className = "block">
                                        <span className = "items-center gap-1 text-sm text-gray-300 ">
                                                  {
                                                       PlayList || proFile ? ""
                                                       :
                                                         <div className = "flex items-center gap-1 text-sm text-gray-300"  >
                                                              <span>Số lượt thích: <span className = "text-white" >{likeNum},</span></span>
                                                              <span>Số lượt nghe: <span className = "text-white" >{listenNum}</span> </span>
                                                         </div>
                                                  }
                                        </span>  
                                        

                                        <span className = "mt-2 text-sm md:flex hidden  items-center gap-1">
                                                  {
                                                       PlayList ? 
                                                       <div className = "flex items-center gap-2">
                                                            <img className = "w-6" src = {profile[0]?.image}  alt="" />
                                                            <span>Tri Nguyen</span>
                                                       </div>:
                                                       proFile ?
                                                       <div className = "flex items-center gap-2">
                                                            <span>{playList?.length} danh sách phát công khai</span>
                                                            <span>. {likedArtists?.length} đang theo dõi</span>
                                                       </div>:
                                                       <div className = "text-sm flex items-center gap-1" >
                                                            <span className = "mr-1">Dành cho {profile[0]?.name}</span>
                                                            <span>. {songLength} bài hát,</span>
                                                            <span className = "text-gray-300">{CovertTimeTitle(timeTotal)}</span>
                                                       </div>
                                                       
                                                  }
                                                  
                                                  
                                        </span>
                                   </div>     

                              </div>
                         </div>
               </div>  

          }

          {
               menu &&
               <div className =  { `bg-gradient-to-b  ${finalcolor} `}>
                         <MenuTitle menu = {menu} description = {subtitle} name = {title} img = {img} artist = {artist}/>
               </div>
          }

     </div>
  )
}

export default Tittle