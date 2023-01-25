import type { DefaultUser } from 'next-auth';

declare module 'next-auth' {
    interface Session {
      user?: DefaultUser & {
        id: string;
      };
    }
  }


export interface FirstType {
    title : string
    subtitle : string
    button : string
    icon : string

}


export interface MenuTitleType {
    id : string
    description : string
    name : string
    img : string
    artist : boolean

}


export interface ListMusicType {
    items : any
    all : boolean
    artist : boolean
    canDelete : boolean
    playList : any

}


export interface ListMusicTabType {
    data : any
    number : number
    album : boolean
    big : boolean
    canAdd: boolean
    setOpen : any
    canDelete: boolean
    id : string

}


export interface ListMusicTabItemType {
    item : any
    index : number
    album : boolean
    canAdd: boolean
    canDelete: boolean
    id : string

}


export interface MusicCardType {
    item : any
    playList : any
    artist: boolean
    canDelete: boolean

}