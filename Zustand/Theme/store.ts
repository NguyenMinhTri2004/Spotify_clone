import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface ThemeState {
    darkMode : boolean
    changeMode: (darkMode : boolean) => void
}

const initialState = {
}

export const useThemeStore = create<ThemeState>()(
    devtools(
      persist(
        (set) => ({
        darkMode : true ,

        changeMode: (darkMode : boolean) => set((state) => ({
            ...state,
            darkMode
        })),

        }),
      )
    )
  )


