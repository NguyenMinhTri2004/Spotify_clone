import React from 'react'
import First from "../First/First"
import { useProfileStore } from '../../Zustand/UserProfile/store'
import SectionTitle from '../Section/SectionTittle'
import SectionBody from '../Section/SectionBody'
import ListMusic from '../Music/ListMusic'


const ArtistTab = () => {

    const likedArtists = useProfileStore(state => state?.profile[0]?.likedArtists)

    return (
        <div>

            {
                 likedArtists?.length > 0 ?
                    <div>
                         <SectionTitle>
                               Nghệ Sĩ
                         </SectionTitle>

                        <SectionBody>
                                <ListMusic
                                    items = {likedArtists}
                                    all = {true}
                                    artist = {true}
                                    canDelete = {true}
                                />
                        </SectionBody>
                    </div>
                        :
            
                        <First
                            title = "Theo dõi nghệ sĩ đầu tiên của bạn"
                            subtitle = "Theo dõi nghệ sĩ bạn yêu thích bằng cách nhấn vào nút theo dõi."
                            button = "Tìm nghệ sĩ"
                            icon = "bx bxs-user-plus"
                        />
    
            }
        </div>
      )
}

export default ArtistTab