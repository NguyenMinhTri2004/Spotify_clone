import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface SlideState {
    open : boolean
    setOpen: (open : boolean) => void
}

const initialState = {
}

export const useSlideStore = create<SlideState>()(
    devtools(
      persist(
        (set) => ({
            open : false,
            setOpen : (open : boolean) => set((state) => ({
                ...state,
                open
            })),

        }),
      )
    )
  )


