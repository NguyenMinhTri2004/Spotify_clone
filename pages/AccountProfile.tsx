
import Link from 'next/link'
import React, { useState } from 'react'
import ListMusic from '../components/Music/ListMusic'
import ListMusicTab from '../components/Music/ListMusicTab'
import SectionBody from '../components/Section/SectionBody'
import SectionTitle from '../components/Section/SectionTittle'
import Tittle from '../components/Tittle/Tittle'
import { useProfileStore } from '../Zustand/UserProfile/store'
import Profile from '../components/Modal/Profile'
import Modal from '../components/Modal/Modal'

const AccountProfile = () => {

  let profile = useProfileStore(state => state?.profile[0])

  const likedArtists = useProfileStore(state => state?.profile[0]?.likedArtists)

  const likedSongs = useProfileStore (state => state?.profile[0]?.likedSongs)

  const playList = useProfileStore(state => state?.profile[0]?.playLists)

  const [openModal , setOpenModal] = useState(false)

  
  return (
    <div>
    <Tittle
        title = {profile?.name}
        img = {profile?.image}
        fontsize = {"text-[2rem]"}
        subtitle = {'Hồ Sơ'}
        artist = {false}
        menu = {false}
        canChangeImage = {true}
        proFile = {true}
        setOpenModal = {setOpenModal}
        openModal = {openModal}
    />



    <SectionTitle>
        Bài hát đã thích

        {
            likedSongs?.length > 6
            &&
            <Link href = {`/FavoriteMusic`} >
                <p className = "text-xs text-gray-300 cursor-pointer">XEM TẤT CẢ</p>   
            </Link>   
        }    
    </SectionTitle>

    <SectionBody>
           <ListMusicTab 
                data = {likedSongs?.slice(0,6)}
                big = {true}
                album = {true}
           />
    </SectionBody>


    <SectionTitle>
         Đang theo dõi

         {
            likedArtists?.length > 6
            &&
            <Link href = {`/Library/3`} >
                <p className = "text-xs text-gray-300 cursor-pointer">XEM TẤT CẢ</p>   
            </Link>   
         }    
    </SectionTitle>

    <SectionBody>
           <ListMusic
                items = {likedArtists}
                all = {true}
                artist = {true}
                canDelete = {true}
            />
    </SectionBody>


    <SectionTitle>
        PlayList công khai

        {
            playList?.length > 6
            &&
            <Link href = {`/Library/1`} >
                <p className = "text-xs text-gray-300 cursor-pointer">XEM TẤT CẢ</p>   
            </Link>   
        }    
    </SectionTitle>

    <SectionBody>
           <ListMusic
                items = {playList}
                all = {false}
                artist = {false}
                canDelete = {true}
                playList = {true}
            />
    </SectionBody>
    
     {
        openModal && <Modal>
             <Profile setOpenModal={setOpenModal} data = {profile}/>
        </Modal> 
     }

</div>
  )
}

export default AccountProfile