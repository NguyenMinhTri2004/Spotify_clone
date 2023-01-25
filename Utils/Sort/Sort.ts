

export const SortByTitle =  (data: any) => {
    const result =  data?.data.song.items.sort((a : any, b : any) => a.title.toLowerCase() === b.title.toLowerCase() ? 0 : a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1);  
    return result
}


export const SortByArtist =  (data: any) => {
    const result =  data?.data.song.items.sort((a : any, b : any) => a.artistsNames.toLowerCase() === b.artistsNames.toLowerCase() ? 0 : a.artistsNames.toLowerCase() > b.artistsNames.toLowerCase() ? 1 : -1); 
    return result
}


export const SortByAlbum =  (data: any) => {
    const result =  data?.data.song.items.sort((a : any, b : any) => a?.album?.title?.toLowerCase() === b?.album?.title?.toLowerCase() ? 0 : a?.album?.title?.toLowerCase() > b?.album?.title?.toLowerCase() ? 1 : -1); 
    return result
}


export const SortByDuration =  (data: any) => {
    const result =  data?.data.song.items.sort((a : any, b : any) => a.duration-b.duration); 
    return result
}