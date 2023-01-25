import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface AlertState {
    contentAlert : any
    typeAlert : any
    addAlert: (contentAlert: any , typeAlert: any) => void
}

const initialState = {
}

export const useLoadingStore = create<AlertState>()(
    devtools(
      persist(
        (set) => ({
        contentAlert : "",
        typeAlert : "",

        addAlert: (contentAlert: any , typeAlert: any) => set((state) => ({
            ...state,
            contentAlert,
            typeAlert
        })),

        }),
      )
    )
  )


