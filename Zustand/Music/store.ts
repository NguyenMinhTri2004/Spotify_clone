import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface PlayMusicState {
    addCurrentMusic: (indexPlayMusic : number , idSong : any) => void
    addThumbnailM: (thumbnailM : string) => void
    addPlayList: (playList : any ) => void
    addIdPlayList: (idPlayList : any) => void
    addQueue: (queue : any) => void
    updatePlayList: (changePlayList : boolean) => void
    addOpen: (open : boolean) => void
    setLikedSongs : (likedSong : any) => void
    changePlay: (play : boolean) => void
    updateCurrentTime: (currentTime : number) => void
    indexPlayMusic : number,
    idSong : any,
    idPlayList : any,
    thumbnailM : string, 
    open : boolean,
    playList : any,
    queue : any,
    play : boolean,
    currentTime : number,
    likedSongs : any,
    changePlayList : boolean,
}

const initialState = {
}

export const usePlayMusicStore = create<PlayMusicState>()(
    devtools(
      persist(
        (set) => ({
        indexPlayMusic : -1,
        idSong : "",
        idPlayList : "",
        thumbnailM : "",
        open : false,
        playList : [],
        play : false,
        currentTime : 0,
        likedSongs : [],
        queue : [],
        changePlayList : false,

            addCurrentMusic: (indexPlayMusic : number , idSong : any) => set((state) => ({
                ...state,
                indexPlayMusic,
                idSong
            })),

            addThumbnailM: (thumbnailM : string) => set((state) => ({
                ...state,
                thumbnailM
            })),

            addOpen: (open : boolean) => set((state) => ({
              ...state,
              open
             })),

             addPlayList: (playList : any ) => set((state) => ({
              ...state,
              playList,
             })),

             addIdPlayList: (idPlayList : any) => set((state) => ({
              ...state,
              idPlayList,
             })),


             addQueue: (queue : any) => set((state) => ({
              ...state,
              queue
             })),

             updatePlayList: (changePlayList : boolean) => set((state) => ({
              ...state,
              changePlayList
             })),


             changePlay: (play : any) => set((state) => ({
              ...state,
              play
             })),


             updateCurrentTime: (currentTime : number) => set((state) => ({
              ...state,
              currentTime
             })),

             setLikedSongs: (likedSongs : any) => set((state) => ({
              ...state,
              likedSongs
             })),
        }),
      )
    )
  )


