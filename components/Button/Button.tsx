import React from 'react'

const Button = ({children , position } : any) => {
  return (
   <div className={`flex items-center justify-${position} my-5`}>
        <button  className="text-white cursor-pointer py-1 px-6 border rounded-3xl  hover:bg-slate-500  ">
            {children}
        </button>
   </div> 
  )
}

export default Button