import { View, Text, ActivityIndicator, Pressable, ScrollView } from 'react-native'
import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { router } from 'expo-router';

interface Post{
    userId:number;
    id:number;
    title:string;
    body:string

}
export const fetchPostApi=async ():Promise<Post[]>=>{
    const response=await fetch('https://jsonplaceholder.typicode.com/posts')
    if(!response.ok) throw new Error("데이터를 불러오는데 실패했다")
    const datas=await response.json()
    return datas
}

export default function index() {
    const {data:posts,isLoading,isError,error}=useQuery({
        queryFn:fetchPostApi,
        queryKey:["post"],
        select: (datas)=>datas.slice(0,10)
    })  
    if(isLoading){
        return (
            <View className='flex flex-1 justify-center items-center bg-white'>
                <ActivityIndicator size="large" color="#3b82f6" />
            </View>
        )
    }
    if(isError){
        return (
            <View className='flex flex-1 justify-center items-center bg-white'>
                <Text>오류 발생:{error.message}</Text>
            </View>
        )
    }
}
//  const postList=posts?.map((post)=>(
//        <Pressable
//            key={post.id}
//            className='
//                p-4 bg-gray-50
//                border border-gray-200
//                rounded-xl active:bg-gray-300
//            '
//            onPress={()=>{
//                router.push({
//                    pathname:`/stack/${post.id}`as any,
//                })
//        }}
//        >
//            <Text className='font-semibold text-gray-900' numberOfLines={1}>
//                {post.id}번, {post.title}
//            </Text>
//        </Pressable>
//    ))
//
//    return (
//        <ScrollView className='m-4 gap-4'>
//            <Text className='px-4 pt-2'>jsonplaceholder post 게시판</Text>
//            {postList}
//        </ScrollView>
//    )
//}