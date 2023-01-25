import React from 'react'
import Link from "next/link"
// import { FirstType } from '../../Types'

const First = ({title , subtitle , button , icon} : any) => {
  return (
        <div className="flex flex-col items-center justify-center gap-8 text-white font-bold  py-5 ">
            <i className={` ${icon} text-6xl mt-16`}></i>
            <h3 className = "text-3xl">{title}</h3>
            <p>{subtitle}</p>
            <Link href="/Search/explore">
                <span className = "bg-white text-black px-7 py-3 rounded-3xl cursor-pointer hover:scale-105 ease-in-out duration-300">
                        {button}
                </span>
            </Link>
        </div>
  )
}

export default First