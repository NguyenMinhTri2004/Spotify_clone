import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface SearchDetailState {
    search : any
    category : any
    setSearch: (search: any) => void
    setCategory: (category: any) => void
}

const initialState = {
}

export const useSearchDetailStore = create<SearchDetailState>()(
    devtools(
      persist(
        (set) => ({
        search : "",
        category : "",
        setSearch: (search: any) => set((state) => ({
            ...state,
            search
        })),

        setCategory: (category: any) => set((state) => ({
            ...state,
            category
        })),

        }),
      )
    )
  )


