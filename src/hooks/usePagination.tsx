import { useMemo } from "react";

export const usePagination = (totalPosts:number) =>{
  const pages = useMemo(()=>{
    let pagesArr = [] as number[]
    for (let i=0; i< totalPosts; i++){
      pagesArr.push(i + 1)
    }
    return pagesArr;
  },[totalPosts])
  return pages;
}