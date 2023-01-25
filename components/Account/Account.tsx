import React, { useState } from 'react'
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { useProfileStore } from '../../Zustand/UserProfile/store'

const Account = () => {

  const { data: session } = useSession()

  let profile =  useProfileStore(state => state?.profile[0])

  const [openModal , setOpenModal] = useState(false)

  const handleOpen = (e) => {
      e.preventDefault()
      setOpenModal(!openModal)
  }

  return (
    <Link href = "./Login">
        {
            session ? 
            <div className="relative ">
                <span onClick = {(e) => handleOpen(e)} className = "flex items-center gap-2  bg-black rounded-xl p-1 text-white ">
                    <img className = "rounded-full w-5" src = {profile?.image}  alt="" /> 
                    <span className = "text-base font-bold hidden md:block">{profile?.name}</span>
                    <i className='bx bxs-down-arrow text-[10px]'></i>
                    
                </span>
                    {
                          openModal &&
                          <div className='absolute bottom-[-100] bg-slate-500 w-[7rem] md:left-[20px] left-[-20px] flex flex-col p-3 rounded-md'>
                              <span onClick={() => signOut()} className='p-1 hover:bg-slate-600'>Đăng xuất</span>
                              <Link href= "/AccountProfile">
                                  <span className='p-1 hover:bg-slate-600'>Hồ sơ</span>
                              </Link>
                          </div>
                    }
            </div>
            : <div className = "text-white">Login</div>
        }
        
    </Link>
  )
}

export default Account