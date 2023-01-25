import React from 'react'
import MusicCard from "./MusicCard"
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import {Navigation } from "swiper"
import { ListMusicType } from '../../Types'

const ListMusic = ({items , all , artist , canDelete, playList} : any) => {

    
  return (
      <div className = "">
          {
             all ?
               <div className = "flex-wrap flex items-center gap-3">
                            {
    
                                items?.map((item: any , index : number) => {
                
                                    return (
                                      
                                            <MusicCard playList = {playList} artist = {artist} canDelete = {canDelete} key = {index} item = {item} />
                                        
                                    )
                                })
                            }

               </div>


                : 
                <Swiper
                            slidesPerView={6}
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
                                    slidesPerView: 2,
                                    spaceBetween: 0,
                                },

                                640: {
                                  slidesPerView: 3,
                                  spaceBetween: 20,
                                },
                                768: {
                                  slidesPerView: 3,
                                  spaceBetween: 20,
                                },

                                800: {
                                  slidesPerView: 3,
                                  spaceBetween: 20,
                                },

                                1024: {
                                  slidesPerView: 6,
                                  spaceBetween: 50,
                                },
                              }}

                            modules={[Navigation]}
                            className="mySwiper"
                            >

                            {
                                 items?.slice(0,8)?.map((item: any , index : number) => {

                                    return (
                                        <SwiperSlide key = {index}>
                                            <MusicCard playList = {playList} key = {index} item = {item} artist = {artist} canDelete = {canDelete}  name = {item.alias}/>
                                        </SwiperSlide>
                                    )
                                })
                            }
                </Swiper>
               
          }
      </div>
  )
}

export default ListMusic