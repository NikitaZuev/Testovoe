import { useMemo } from "react"
import {post} from '../types/post'
export const useSortedPosts = (posts:post[],sort:string,click:boolean) =>{
  const sortedPost = useMemo(()=>{
    if(sort && sort != 'id' && click == true){
      return [...posts].sort((a:any,b:any)=> a[sort].localeCompare(b[sort]))
    }
    else if(sort && sort != 'id' && click == false){
      return [...posts].sort((a:any,b:any)=> b[sort].localeCompare(a[sort]))
    }
    else if(sort == 'id' && click == true){
      return [...posts].sort((a,b)=> b.id - a.id)
    }
    else if(sort == 'id' && click == false){
      return [...posts].sort((a,b)=> a.id - b.id)
    }
    else{
      return posts ;
    }
  },[posts,sort,click])
  return sortedPost
}

export const usePosts = (posts:post[],sort:string,searchQuery:string,click:boolean) =>{
  const sortedPost = useSortedPosts(posts,sort,click)
  const sortedAndSearchedPoost = useMemo(()=>{
    return sortedPost.filter(post => post.title.includes(searchQuery))
  },[searchQuery, sortedPost])

  return sortedAndSearchedPoost;
}