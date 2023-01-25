import React, { useEffect, useState } from 'react'
import {useThemeStore} from "../../Zustand/Theme/store"


const Toggle = () => {

  const [navBg, setNavBg] = useState(false)
  
  const changeMode = useThemeStore(state => state?.changeMode)

  const darkMode = useThemeStore(state => state?.darkMode)

  const handleOnchange = () => {
        changeMode(!darkMode)
  }

  return (
    <div className = {`bg-transparent w-12 h-6  rounded-lg flex  bg-slate-800 `} onClick={() => handleOnchange()}>
        <span  className = {`rounded-full w-[50%] ease-in-out duration-300 h-full ${darkMode ? "bg-black  translate-x-6  " : "bg-white" }`}>

        </span>
    </div>
  )
}

export default Toggle