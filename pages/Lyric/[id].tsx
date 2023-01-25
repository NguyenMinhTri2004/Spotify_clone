import React, { useEffect, useState } from 'react'
import { GetLyricSong } from '../../Utils/CustomApi/Music'
import { AxiosResponse } from 'axios'
import { usePlayMusicStore } from '../../Zustand/Music/store'
import {useLoadingStore} from "../../Zustand/Loading/store"
import { useThemeStore } from '../../Zustand/Theme/store'



const Lyric = () => {

  const idSong = usePlayMusicStore(state => state?.idSong)

  const [lyric, setLyric] = useState<AxiosResponse | null | void>(null)

  const [color , setColor] = useState("")

  const changeMode = useLoadingStore(state => state?.changeMode)

  const darkMode = useThemeStore(state => state?.darkMode)

  const bgColorsArray = ['bg-slate-900' , 'bg-gray-900' , 'bg-red-900', 'bg-orange-900' , 'bg-yellow-900' , 'bg-lime-900', 'bg-green-900', 'bg-emerald-900', 'bg-cyan-900' , 'bg-sky-900', 'bg-violet-900' , 'bg-fuchsia-900' , 'bg-pink-900', 'bg-rose-900']

  const RandomColor = () => {
    const index = Math.floor(Math.random() * 14)
    setColor(bgColorsArray[index])
  }

  useEffect(() =>{
    const getData = async () => {
      changeMode(true)
      const data = await  GetLyricSong(idSong)
      setLyric(data)
      window.scrollTo(0, 0)
      changeMode(false)
    }
    RandomColor()
    getData()
}, [idSong])

  const currentTime = usePlayMusicStore(state => state?.currentTime)

  return (
    <div className = {`${color} `}>
          {
            lyric?.data?.sentences ?
            lyric?.data?.sentences?.map((item : any , index: number) => {
              if(item?.words[0]?.startTime <= currentTime*1000 && currentTime*1000 <= item?.words[item.words.length - 1].startTime ) {
                document.getElementById(`line-${index}`)?.scrollIntoView({ behavior: "smooth", block: "center" })
              }
              return (
                <div
                  id={`line-${index}`}
                  key={index}
                  className={"my-[2px] mx-0 px-40 py-3 rounded-xl transition-all duration-500 hover:bg-gray-500" + ( item?.words[0]?.startTime <= currentTime*1000 && currentTime*1000 ? "origin-[center_left] scale-105 " : "" )}
                  >
                    {
                        item?.words?.map((item : any , index : number) => {
                            return (
                                 <span key={index} className = {"mr-2 text-base md:text-5xl text-white font-bold  cursor-pointer inline-block " + ( item?.startTime <= currentTime*1000 && currentTime*1000 <= item?.endTime ? "opacity-100" : "opacity-30" ) }>{item.data}</span>
                            )
                        })
                    }
                    
                </div>
              )
            })
            :
            <div className="w-full h-screen flex items-center justify-center">
                <span className = "text-white font-bold text-7xl">Bài hát hiện chưa có lyric</span>
            </div>
          }
    </div>
  )}
export default Lyric