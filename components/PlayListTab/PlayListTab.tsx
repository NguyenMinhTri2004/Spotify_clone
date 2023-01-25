import React from 'react'
import { useProfileStore } from '../../Zustand/UserProfile/store'
import First from '../First/First'
import ListMusic from '../Music/ListMusic'
import SectionBody from '../Section/SectionBody'

const PlayListTab = () => {

  const playList = useProfileStore(state => state?.profile[0]?.playLists)

  
  return (
    <div>
        <div className = "flex items-center justify-between">
            <p className ="text-white text-2xl font-bold mt-8">Playlist</p>
        </div>

         {
                  playList?.length > 0 ?
                  <SectionBody>
                           <ListMusic
                              items = {playList}
                              all = {true}
                              artist = {false}
                              playList = {true}
                              canDelete = {true}
                           />
                  </SectionBody> :

                  <First
                        title = "Tạo playlist đầu tiên của bạn"
                        subtitle = "Tạo playlist của yêu thích bằng cách nhấn vào nút theo dõi."
                        button = "Thêm playlist"
                        icon = "bx bxs-user-plus"
                  />
         }
       
    </div>
  )
}

export default PlayListTab