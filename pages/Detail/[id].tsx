import { AxiosResponse } from "axios"
import {useState , useEffect} from "react"
import ListMusicTab from "../../components/Music/ListMusicTab"
import Tittle from "../../components/Tittle/Tittle"
import { useRouter } from 'next/router'
import {GetDetailPlaylist} from "../../Utils/CustomApi/Music"
import { usePlayMusicStore } from '../../Zustand/Music/store'
import {useLoadingStore} from "../../Zustand/Loading/store"
import { useSearchDetailStore } from "../../Zustand/SearchDetail/store";
import { SortByTitle , SortByArtist , SortByDuration } from "../../Utils/Sort/Sort";
import {SearchByName} from "../../Utils/Search/Search"

const Detail = () => {

  const router = useRouter()

  const id = router?.query?.id 

  const changeMode = useLoadingStore(state => state?.changeMode)

  const [color , setColor] = useState('')

  const [subColor , setSubColor] = useState('') 

  const [finalColor , setFinalColor] = useState('')

  const [dataHome, setDataHome] = useState<AxiosResponse | null | void>(null);

  const search = useSearchDetailStore(state => state?.search)

  const category = useSearchDetailStore(state => state?.category)

  const [resultSearch, setResultSearch] = useState([]) 

  const setSearch = useSearchDetailStore(state => state?.setSearch)


  const addPlayList = usePlayMusicStore(state => state?.addPlayList)


  const handleSort = (data: any) => {
     if(category == "Tiêu đề"){
         SortByTitle(data)
     }else if(category == "Nghệ sĩ"){
         SortByArtist(data)
     }else {
         SortByDuration(data)
     }
  }

  const handleSearch = (tmp: any) => {
     const result = SearchByName(tmp,search)
     setResultSearch(result)
  }


   useEffect(() =>{
        const getData = async () => {
          changeMode(true)
          let data = await GetDetailPlaylist(id + "")
          if(search !== ''){
              handleSort(data)
              handleSearch(data)
          }
          setDataHome(data)
          addPlayList(data?.data?.song?.items)
          changeMode(false)
        }
        getData()
        window.scrollTo(0, 0)
   }, [id , resultSearch?.length , category , search ])


   const bgColorsArray = ['from-slate-400' , 'from-gray-400' , 'from-red-400', 'from-orange-400' , 'from-yellow-400' , 'from-lime-400', 'from-green-400', 'from-emerald-400', 'from-cyan-400' , 'from-sky-400', 'from-violet-400' , 'from-fuchsia-400' , 'from-pink-400', 'from-rose-400']

   const bgSubColorsArray = ['to-slate-700' , 'to-gray-700' , 'to-red-700', 'to-orange-700' , 'to-yellow-700' , 'to-lime-700', 'to-green-700', 'to-emerald-700', 'to-cyan-700' , 'to-sky-600', 'to-violet-700' , 'to-fuchsia-700' , 'to-pink-700', 'to-rose-700']

   const bgFinalColorsArray = ['from-slate-900' , 'from-gray-900' , 'from-red-900', 'from-orange-900' , 'from-yellow-900' , 'from-lime-900', 'from-green-900', 'from-emerald-900', 'from-cyan-900' , 'from-sky-900', 'from-violet-900' , 'from-fuchsia-900' , 'from-pink-900', 'from-rose-900']


   const RandomColor = () => {
       const index = Math.floor(Math.random() * 14)
       setColor(bgColorsArray[index]) 
       setSubColor(bgSubColorsArray[index])
       setFinalColor(bgFinalColorsArray[index])  
   }

   useEffect(() => {
       RandomColor()
       setSearch('')
   },[])


  return (
    <div>
        <Tittle
            title = {dataHome?.data?.title}
            subtitle = {dataHome?.data?.sortDescription?.length > 130 ? dataHome?.data?.sortDescription?.slice(0,130) + "...." : dataHome?.data?.sortDescription}
            img = {dataHome?.data?.thumbnailM}
            fontsize = {dataHome?.data?.title?.length > 25 ? "text-[1rem]" : "text-[2rem]"}
            songLength = {dataHome?.data?.song?.total}
            timeTotal = {dataHome?.data?.song?.totalDuration}
            likeNum = {dataHome?.data?.like}
            listenNum = {dataHome?.data?.listen}
            color = {color}
            subcolor = {subColor}
            menu = {true}
            finalcolor = {finalColor}
            artist = {false}
        />

        <ListMusicTab 
            data = {search?.length > 0 ? resultSearch : dataHome?.data?.song?.items}
            big = {true}
            album = {true}
            id = {dataHome?.data?.encodeId}
        />
    </div>

  )
}

export default Detail