import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface ArtistState {
    artist : any
    setArtist: (  artist : any) => void
}

const initialState = {
}

export const useArtistStore = create<ArtistState>()(
    devtools(
      persist(
        (set) => ({
            artist : {},
            setArtist: ( artist : any) => set((state) => ({
                ...state,
                artist
            })),

        }),
      )
    )
  )


