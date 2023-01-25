import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import {Navigation } from "swiper"

const Slider = ({data} : any) => {
  
  return (
    <div className = 'flex items-center'>
      <Swiper
       spaceBetween={20}
       slidesPerView={3}
       navigation = {true}
       pagination={{
        clickable: true,
      }}
        autoplay= { {
        delay: 2500,
        disableOnInteraction: false,
      }}


       breakpoints={{
             320: {
                slidesPerView: 1,
                spaceBetween: 0,
             },

             640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 50,
            },
          }}                  

          modules={[Navigation]}
          className="mySwiper"


      >
            {
              data.items.map((item : any , index : number) =>{
                  return (
                    <SwiperSlide key = {index}>
                           <img src= {item?.banner} alt="" className = "rounded-md" />
                    </SwiperSlide>
                  )
              })
            }
      </Swiper>
    </div>
  )
}

export default Slider