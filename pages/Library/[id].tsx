import { useEffect, useState } from 'react'
import PlayListTab from '../../components/PlayListTab/PlayListTab'
import Podcasttab from '../../components/Podcast/Podcasttab'
import ArtistTab from '../../components/Artist/ArtistTab'
import AlbumTab from '../../components/Album/AlbumTab'
import { useRouter } from 'next/router'
import { useThemeStore } from '../../Zustand/Theme/store'

const Library = () => {

  const [selectedTab , setSelectedTab] = useState(1)

  const router = useRouter()
  
  const id = router.query.id 

  const darkMode = useThemeStore(state => state?.darkMode)

  useEffect(() => {
      setSelectedTab(Number(id))
  },[id])

  return (
    <main className = "bg-black h-screen" >
        <div className="wrapper flex items-center h-[95%] p-5 gap-5  ">
            <div className =  { `${darkMode ? "bg-stone-900" : "bg-[#170f23]" } w-full h-full p-3 rounded-lg overflow-y-scroll overflow-x-hidden`}>
                 <ul className = "text-white flex flex-col gap-5 cursor-pointer font-bold text-sm md:flex-row">
                    <li onClick={() => setSelectedTab(1)} className = {`p-2.5 rounded ${selectedTab == 1 ? 'bg-stone-700' : ""}`} >PlayList</li>
                    <li onClick={() => setSelectedTab(2)} className = {`p-2.5 rounded ${selectedTab == 2 ? 'bg-stone-700' : ""}`}  >Podcast</li>
                    <li onClick={() => setSelectedTab(3)} className = {`p-2.5 rounded ${selectedTab == 3 ? 'bg-stone-700' : ""}`}   >Nghệ sĩ</li>
                    <li onClick={() => setSelectedTab(4)} className = {`p-2.5 rounded ${selectedTab == 4 ? 'bg-stone-700' : ""}`} >Album</li>
                 </ul>

                 {selectedTab == 1 && <PlayListTab/>} 
                 {selectedTab == 2 && <Podcasttab/>}
                 {selectedTab == 3 && <ArtistTab/>}
                 {selectedTab == 4 && <AlbumTab/>}
           </div>
        </div>
    </main>
  )
}

export default Library