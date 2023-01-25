
import React from 'react'
import ListMusicTabItem from './ListMusicTabItem'
import { ListMusicTabType } from '../../Types'

const ListMusicTab = ({data , number , album , big , canAdd , setOpen , canDelete , id} :  any ) => {

  return (
    <div className="px-5 ">

      {
            big &&
            <div className="flex items-center text-gray-300 w-full justify-between border-b p-2 mb-3 text-sm">
                  <span className = "w-[22rem] text-sm font-medium md:w-[26rem]"># TIÊU ĐỀ</span>
                  <span className = "md:w-[26rem] w-[8rem] text-sm font-medium">ALBUM</span>
                  <span>
                    <i className='bx bx-time text-xl font-medium'></i>
                  </span>
            </div>
      }
        <ul >
                {
                    data?.slice(0, number).map((item : any, index : number) => {
                          return (
                              <ListMusicTabItem key = {index} id = {id} canDelete = {canDelete} setOpen = {setOpen} item={item} index={index} album = {album} canAdd = {canAdd}/>
                          )
                    })
                }
        </ul>
    </div>
  )
}



export default ListMusicTab