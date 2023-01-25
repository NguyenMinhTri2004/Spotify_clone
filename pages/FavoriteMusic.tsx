
import Tittle from "../components/Tittle/Tittle"
import First from "../components/First/First"
import { useProfileStore } from '../Zustand/UserProfile/store'
import ListMusicTab from "../components/Music/ListMusicTab"
import React , {useEffect} from 'react'
import { usePlayMusicStore } from "../Zustand/Music/store"

const FavoriteMusic = () => {

    const addPlayList = usePlayMusicStore(state => state?.addPlayList)

    const likedSongs = useProfileStore (state => state?.profile[0]?.likedSongs)

    useEffect(() => {
        addPlayList(likedSongs)
    }, [likedSongs?.length])

   
    return (
        <main className = "bg-gradient-to-b from-slate-700 via-slate-800 h-full" >
            <div className="wrapper flex items-center h-[95%] p-5 gap-5">
                <div className = "w-full h-full  rounded-lg ">
                       <Tittle
                            subtitle = "PLAYLIST"
                            title = "Bài hát đã thích"
                            icon = "bx bxs-heart"
                            fontsize = "text-2xl"
                            color = "from-blue-700"
                            subcolor = "to-amber-200"
                            canChangeImage = {false}
                        />

                        <div className = "">
                               {
                                   likedSongs?.length > 0 ?
                                   <ListMusicTab 
                                        data = {likedSongs}
                                        big = {true}
                                        album = {true}
                                    />
                                   :
                                    <First
                                        title = "Bài hát bạn yêu thích sẽ xuất hiện ở đây"
                                        subtitle = "Lưu bài hát bằng cách nhấn vào biểu tượng trái tim."
                                        button = "Tìm bài hát"
                                        icon = "bx bxs-music"

                                    />
                               }
                        </div>
                </div>
            </div>
        </main>
      )
}

export default FavoriteMusic