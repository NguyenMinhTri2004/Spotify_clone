import React from 'react'
import Input from "../Search/Input"
import Account from "../Account/Account"
import Toggle from '../Button/Toggle'
import {useSlideStore} from "../../Zustand/Slide/store"


const Header = () => {

  const setOpen = useSlideStore(state => state.setOpen)

  const openSlide = useSlideStore(state => state.open)

  return (
    <div  className = {` top-0  z-[999] items-center w-screen text-gray-300  fixed py-2 hover:text-white ease-in-out duration-500 bg-stone-900/80`}>
      <div className = 'flex top-0 items-center w-[82%] justify-between px-5'>
            
            <div className='flex items-center gap-2 cursor-pointer'>
                <i onClick = {() => setOpen(!openSlide)} className='bx bx-menu hidden text-[30px] md:text-[0px]'></i>
                <Input/>
            </div>

            <div className = "flex items-center cursor-pointer gap-5">
                <Toggle/>
                <Account/>
            </div>
      </div>
    </div>
  )
}

export default Header