import React from 'react'
import {useState , useEffect} from "react"
import ListMusic from "../../components/Music/ListMusic"
import {GetHome} from "../../Utils/CustomApi/Music"
import { useRouter } from 'next/router'
import SectionBody from '../../components/Section/SectionBody'
import SectionTitle from '../../components/Section/SectionTittle'
import {useLoadingStore} from "../../Zustand/Loading/store"


const Category = () => {

  const router = useRouter()

  const id = router?.query?.id

  const [dataHome, setDataHome] = useState([])

  const changeMode = useLoadingStore(state => state?.changeMode)

   useEffect(() =>{
        const getData = async () => {
          changeMode(true)
          const data = await GetHome()
          const categoryData = data?.data?.items.find((item : any)  => item?.title == id )
          setDataHome(categoryData?.items)
          changeMode(false)
        }

        getData()
   }, [])

  return (
          <div className = "bg-stone-900 w-full h-full p-3 rounded-lg  text-white">
         
                        <SectionTitle>
                            {id}
                        </SectionTitle>
                   
                        <SectionBody>
                                    {
                                        <ListMusic items = {dataHome} all = {true}/>
                                    }
                        </SectionBody>
                              
                             
                                  
          
          </div>
  )
}

export default Category