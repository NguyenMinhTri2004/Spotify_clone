import React , {useState} from 'react'
import {useSearchDetailStore} from "../../Zustand/SearchDetail/store"



const InputByCategory = ({selectArray} : any) => {

  const [open , setOpen] = useState(false)

  const setSearch = useSearchDetailStore(state => state?.setSearch)

  const setCategory = useSearchDetailStore(state => state?.setCategory)

  const handleOpen = () => {
        setOpen(!open)
  }

  const handleSearch = (e) => {
        setSearch(e.target.value)
  }

  const handleCategory = (e) => {
        setCategory(e.target.value)
  }

  return (

    <div className = "flex items-center gap-5 bg-transparent">
          <i onClick={() => handleOpen()} className='bx bx-search text-gray-300 cursor-pointer text-xl'></i>
          <input  onChange={(e) => handleSearch(e)} className={`text-sm text-white ${open ? "w-44 p-1"  : "w-0"} bg-stone-400/50  ease-in-out duration-500  placeholder:text-white outline-none rounded-md` } placeholder='Tìm kiếm danh sách'/>
          <select onChange = {(e) => handleCategory(e)} className = "bg-transparent text-white z-50 outline-none ">
                          {
                              selectArray &&  selectArray.map((item :any , index :number)  => {
                                    return (
                                        <option className = "bg-stone-900 p-5 hover:bg-stone-500 " key = {index}>
                                            {item?.displayName}
                                        </option>
                                    )
                                })
                          }
          </select>
    </div>
  )
}

export default InputByCategory