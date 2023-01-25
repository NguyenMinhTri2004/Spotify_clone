import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface UserProfileState {
    profile : any
    setProfile: ( profile : any) => void
}

const initialState = {
}

export const useProfileStore = create<UserProfileState>()(
    devtools(
      persist(
        (set) => ({
            profile : {},
            setProfile: ( profile : any) => set((state) => ({
                ...state,
                profile
            })),

        }),
      )
    )
  )


