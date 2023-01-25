import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface PlaylistState {
    idMyPlayList : any
    setIdPlayList: (idMyPlayList : any) => void
}

const initialState = {
}

export const usePlaylistStore = create<PlaylistState>()(
    devtools(
      persist(
        (set) => ({
            idMyPlayList : 0,
            setIdPlayList: (idMyPlayList : any) => set((state) => ({
                ...state,
                idMyPlayList
            })),

        }),
      )
    )
  )


