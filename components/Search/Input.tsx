import React , {useState , useEffect} from 'react'
import { useRouter } from 'next/router'

const Input = () => {

  const [search , setSearch] = useState("")

  const [minus , setMinus] = useState(false)

  const router = useRouter()

  const [open , setOpen] = useState(false)

  const [result , setResult] = useState('')

  useEffect(() => {
      if(search.length > 0){
        setMinus(true)
      }
  },[search])


  const appendToStorage = (name, data) => {
    let old : any  = localStorage.getItem(name)
    if(old === null) old = '';
    localStorage.setItem(name, data + "," + old);
}

  const handleSearch = (e) => {
    
     if(e.key === "Enter"){
      router.push(`/Search/${search}`)
        appendToStorage("list", search);
        setOpen(false)
       } 
  }


  const handleOnChange = (e) => {
       setSearch(e.target.value)
        let data : any = localStorage.getItem('list')
        setResult(data)
      if( data !== null && search.length > 1){
        setOpen(true)
      }else {
        setOpen(false)
      }
  }

  const handleClick = (elm) => {
      setOpen(false)
      setSearch(elm)
      router.push(`/Search/${elm}`)
  }

  const handleDelete = () => {
     setMinus(false)
     setSearch('')
     setOpen(false)
  }

  return (
    <div className="w-[100%] relative hidden md:block">
       <i className='bx bx-search absolute left-2 top-2 text-2xl text-black'></i>
       {
           minus && <i onClick={() => handleDelete()} className='bx bx-x absolute right-2 top-2 text-2xl text-black'></i>
       }
        <input onKeyDown={(e) => handleSearch(e)} onChange={(e) => handleOnChange(e)} value = {search} type="text" placeholder="Bạn muốn nghe gì ?" className="rounded-3xl text-sm py-2 px-10 text-slate-800 w-full bg-white outline-none" />
        <ul className = {`${open ? 'block' : 'hidden'} flex flex-col absolute bg-stone-900 shadow-2xl  w-full h-96 overflow-y-scroll`}  >
             <span className = "mb-2 border-b p-2 " >Lịch sử tìm kiếm</span>
             {
                 result?.split(',').map((elm , index , self) => {
                   return (
                      
                          <li onClick = {() => handleClick(elm)} className = "p-3 hover:bg-stone-700" key={index} >{elm}</li>  
                      
                   )
                 })
             }
        </ul>
    </div>
  )
}

export default Input