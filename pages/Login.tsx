import React from 'react'
import {signIn} from "next-auth/react"
import img from "../Assets/Img/bg-login.jpg"

const Login = () => {
  
  return (
     <div  style={{backgroundImage : `url(${img})`}} className = "w-full h-full flex items-center justify-center" >
               <div className="my-[10%] mx-auto w-96 bg-green-600 h-[19rem] items-center justify-center flex flex-col rounded-md">
                    
                    <div>
                         <span className="flex items-center justify-center">
                              <i className='bx bxl-spotify text-9xl' ></i>
                         </span>
                    </div>

                    <div className = "text-white bg-blue-600 flex gap-3 items-center justify-center text-2xl p-5">
                         <span>
                              <i className='bx bxl-facebook' ></i>
                         </span>
                         <button onClick={() => signIn('facebook')}>Đăng nhập bằng Facebook</button>
                    </div>
               </div>
     </div>
  )
}

export default Login