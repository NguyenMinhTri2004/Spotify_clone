import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface LoadingState {
    loadingMode : boolean
    changeMode: (loading : boolean) => void
}

const initialState = {
}

export const useLoadingStore = create<LoadingState>()(
    devtools(
      persist(
        (set) => ({
        loadingMode : false,

        changeMode: (loadingMode : boolean) => set((state) => ({
            ...state,
            loadingMode
        })),

        }),
      )
    )
  )


