import type { NextPage } from 'next'
import { AxiosResponse } from "axios"
import {useState , useEffect} from "react"
import ListMusic from "../components/Music/ListMusic"
import {GetHome} from "../Utils/CustomApi/Music"
import { GetUser } from '../Utils/CustomApi/User'
import Section  from "../components/Section/Section"
import SectionTitle from "../components/Section/SectionTittle"
import SectionBody from "../components/Section/SectionBody"
import Link from "next/link"
import Slider from "../components/Slider/Slider"
import {useLoadingStore} from "../Zustand/Loading/store"
import { useSession } from 'next-auth/react'
import { useProfileStore } from '../Zustand/UserProfile/store'



const Home: NextPage = () => {
 
  const [dataHome, setDataHome] = useState<AxiosResponse | null | void>(null);

  const setProfile = useProfileStore(state => state?.setProfile)

  const changeMode = useLoadingStore(state => state?.changeMode)

  const { data: session } = useSession()

  const idUser  = session?.user?.id

  useEffect(() =>{
       const getData = async () => {
         changeMode(true)
         const data = await GetHome()
         setDataHome(data)
         changeMode(false)
         if(idUser){
              const profileUser = await GetUser(idUser)
              setProfile(profileUser)
         }else{
              setProfile([])
         }
       }

       getData()
  }, [idUser])

 return (
     <div className = "w-full h-full p-3 rounded-lg  text-white">
             {dataHome?.data?.items && <Slider data = {dataHome?.data?.items.find((item : any) => item?.viewType == "slider")}/>} 
             {
               dataHome?.data?.items && dataHome?.data?.items.map((item : any , index : number) => {
                      return (
                       item?.title && item?.sectionType === "playlist" && item?.items?.length > 0 &&
                        <Section key={index}>
                                 <SectionTitle>
                                      {item?.title}   

                                      {
                                          item?.items?.length > 6
                                          &&
                                             <Link href = {`./Category/${item?.title}`} >
                                                       <p className = "text-xs text-gray-300 cursor-pointer">XEM TẤT CẢ</p>   
                                             </Link>   
                                      }    
                                 </SectionTitle>

                                  <SectionBody>
                                       {
                                           item?.items &&  <ListMusic canDelete = {false} items = {item?.items}/>
                                       }
                                  </SectionBody>
                        </Section>
                         
                           
                      )
                 })
             }
     </div>

 )
  
}

export default Home
