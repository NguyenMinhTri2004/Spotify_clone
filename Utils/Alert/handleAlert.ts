import {toast} from 'react-toastify'


export const handleAlert =  (type : any , text:any) => {
        if(type === 'success'){
            toast.success(text)
        }else {
            toast.error(text)
        }
}
