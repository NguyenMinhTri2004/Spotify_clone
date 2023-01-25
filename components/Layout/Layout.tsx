
import Head from 'next/head'
import React from 'react'
import Header from '../Header/Header'
import Menu from '../Menu/Menu'
import Sidebar from '../SideBar/Sidebar'
import {useThemeStore} from "../../Zustand/Theme/store"
import Loading from '../Loading/Loading'
import {useLoadingStore} from "../../Zustand/Loading/store"
import Alert from '../Alert/Alert'
import { useSlideStore } from '../../Zustand/Slide/store'
import Modal from "../Modal/Modal"

const Layout = ({children} : any) => {

  const darkMode = useThemeStore(state => state.darkMode)

  const loadingMode = useLoadingStore(state => state.loadingMode)

  const openSlide = useSlideStore(state => state.open)

  return (
    <div className = {`h-screen overflow-y-hidden`}>
        <Head>
            <title>Spotify_clone</title>
            <meta name="description" content="Spotify by Mt"/>
            <link rel="stylesheet" href=""/>
        </Head>

                      {
                             loadingMode && <Loading/>
                      }

                      
                                  
        <div className = 'h-screen' >
                <div className="wrapper h-full mb-20">
                    <div className="flex h-full  w-full relative ">
                               <Sidebar/>
                        <div  className = {` scrollbar h-full w-full scrollbar-thumb-gray-300  ${darkMode ? "bg-stone-900" : "bg-[#170f23]" }  `}>
                                <Header/>
                                <div className ={`mb-24 mt-[3rem]`}>
                                        {children}
                                </div>
                        </div>

                    </div>
                </div>
                <Menu/>
        </div>

        <Alert/>

    </div>
  )
}

export default Layout