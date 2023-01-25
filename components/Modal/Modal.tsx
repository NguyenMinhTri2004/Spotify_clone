import React from 'react'

const Modal = ({children , setOpenModal}:any) => {

  

  return (
    
    <div  className="w-screen h-screen bg-stone-900/50 z-[100] absolute top-0 right-0 left-0 bottom-0 ">
        <div  className="z-[101]">
              {children}
        </div>
    </div>
  )
}

export default Modal