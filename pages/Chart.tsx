import React , {useEffect , useState} from 'react'
import {ChartHome} from "../Utils/CustomApi/Music"
import { AxiosResponse } from 'axios'
import ListMusicTab from '../components/Music/ListMusicTab'
import Button from '../components/Button/Button'
import { usePlayMusicStore } from '../Zustand/Music/store'
import {useLoadingStore} from "../Zustand/Loading/store"
import SectionTitle from '../components/Section/SectionTittle'


const Chart = () => {
  
  const [dataChart, setDataChart] = useState<AxiosResponse | null | void>(null);

  const [number , setNumber] = useState(10)

  const changeMode = useLoadingStore(state => state?.changeMode)

  const addPlayList = usePlayMusicStore(state => state?.addPlayList)


   useEffect(() =>{
        const getData = async () => {
          changeMode(true)
          const data = await ChartHome()
          setDataChart(data)
          addPlayList(data?.data?.RTChart?.items)
          changeMode(false)
        }
        getData()
   }, [])


  return (
    <div>

          <main className = " h-[98%]" >
            <div className="wrapper h-full px-5">
                <div className="flex items-center h-[90%] gap-2 w-full">
                  <div  className = "h-full w-full">
                        
                        <SectionTitle>
                              <div className = 'flex items-center gap-3'>
                                    <span className = "text-2xl md:text-6xl">#spotifychart</span>
                                    <span className = "p-1 text-white rounded-full cursor-pointer flex items-center justify-center md:text-5xl text-2xl bg-green-600 hover:bg-green-700 ease-in-out duration-300">
                                            <i className='bx bx-play '></i>
                                    </span>
                              </div>
                              
                        </SectionTitle>

                        
                         <ListMusicTab data = {dataChart?.data?.RTChart?.items} number = {number}  album = {1} big = {true}/>
                         {
                              number == 10 ?  
                              <span onClick={() => setNumber(100)}>
                                    <Button 
                                          position = "center"
                                    >
                                          Xem top 100
                                    </Button>
                               </span>
                               :

                               <span onClick={() => setNumber(10)}>
                                    <Button 
                                          position = "center"
                                    >
                                          Thu gọn
                                    </Button>
                                </span>
                         }
                  </div>

                </div>
            </div>
          </main>

   </div>
  )
}

export default Chart