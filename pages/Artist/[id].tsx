import { AxiosResponse } from "axios"
import {useState , useEffect} from "react"
import ListMusicTab from "../../components/Music/ListMusicTab"
import Tittle from "../../components/Tittle/Tittle"
import { useRouter } from 'next/router'
import {GetArtist , GetDetailPlaylist } from "../../Utils/CustomApi/Music"
import { usePlayMusicStore } from '../../Zustand/Music/store'
import SectionTitle from "../../components/Section/SectionTittle"
import SectionBody from "../../components/Section/SectionBody"
import ListMusic from "../../components/Music/ListMusic"
import {useLoadingStore} from "../../Zustand/Loading/store"
import { useArtistStore } from "../../Zustand/Artist/store"

const Artist = () => {

  const router = useRouter()

  const setArtist = useArtistStore(state => state?.setArtist)

  const id: any = router.query.id

  const [dataHome, setDataHome] = useState<AxiosResponse | null | void>(null);

  const addPlayList = usePlayMusicStore(state => state?.addPlayList)

  const changeMode = useLoadingStore(state => state?.changeMode)

  const playList = usePlayMusicStore(state => state?.playList)

  const [more , setMore] = useState(false)

  let dataPlaylist

   useEffect(() =>{
        const getData = async () => {
          changeMode(true)
          const data = await GetArtist(id.split(" ").join("") + "")
          setDataHome(data)
          setArtist(data?.data)
          dataPlaylist = await GetDetailPlaylist(data?.data?.playlistId)
          addPlayList(dataPlaylist?.data?.song?.items)
          changeMode(false)
        }

        getData()
        window.scrollTo(0, 0)
   }, [id])

  return (
    <div>
        <Tittle
            title = {dataHome?.data?.name}
            subtitle = {"Nghệ sĩ được xác minh"}
            img = {dataHome?.data?.cover}
            fontsize = {"text-[6rem]"}
            artist = {true}
            follow = {dataHome?.data?.totalFollow}
            menu = {true}
        />

        <SectionTitle>
             Phổ biến
        </SectionTitle>

        <SectionBody>
            <ListMusicTab 
                data = {playList}
                number = {more ? 10 : 5}
            />

            <span onClick = {() => setMore(!more)} className = "text-gray-300 font-bold cursor-pointer text-[12px] ml-5 my-10" > {more ? "ẨN BỚT" : "XEM THÊM"}</span>
        </SectionBody>


        {
          dataHome?.data?.sections &&  dataHome?.data?.sections?.filter(item => item?.title !== "Bài hát nổi bật" && item?.title !== "MV").map((item : any , index : number) => {
                 return (
                       <div key = {index} >
                              <SectionTitle>
                                    {item?.title}
                              </SectionTitle>

                              <SectionBody>
                                    <ListMusic
                                        items = {item?.items}
                                        all = {false}
                                        artist = {item?.sectionType == "artist" &&  true}
                                    />
                              </SectionBody>
                       </div>
                 )
            })
        }


    </div>
  )
}

export default Artist