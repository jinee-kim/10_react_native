import { Post } from "../../type/post.type"

export const fetchPostApi=async ():Promise<Post[]>=>{
    const response=await fetch('https://jsonplaceholder.typicode.com/posts')
    if(!response.ok) throw new Error("데이터를 불러오는데 실패했다")
    const datas=await response.json()
    return datas
}

export const fetchPostsInfiniteApi=async (pageParam:number):Promise<Post[]>=>{
    const response=await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${pageParam}&_limit=20`)
    if(!response.ok) throw new Error("데이터를 불러오는데 실패했다")
    const datas=await response.json()
    return datas
}
