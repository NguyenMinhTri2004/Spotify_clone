
export const SearchByName =  (data: any, nameMusic: any) => {
    const result =  data?.data.song.items.filter((x: any) => x.title.toLowerCase().includes(nameMusic.toLowerCase()) === true);
    console.log(result);
    return result
}

