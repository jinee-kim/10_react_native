import { View, Text, FlatList, Pressable, ActivityIndicator } from 'react-native'
import React from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { fetchPostsInfiniteApi } from '../../../../api/post/post.api'
import { router } from 'expo-router'

export default function index() {
    const{
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
        error
    }=useInfiniteQuery({
        queryKey:["posts-infinite"],
        queryFn:({pageParam})=>fetchPostsInfiniteApi(pageParam),
        initialPageParam:1,
        getNextPageParam:(lastPage,allPages)=>{
            if(lastPage.length<10) return undefined;
            return allPages.length+1;
        }
    })

    const posts = data?.pages.flatMap((page) => page) || []

    return (
        <FlatList
            data={posts}
            keyExtractor={(item,i)=>`${item.id}-${i}`}
            renderItem={({item})=>(
                <Pressable
                    className='
                        p-4 bg-gray-50
                        border border-gray-200
                        rounded-xl active:bg-gray-300
                    '
                    onPress={()=>{
                        router.push({
                            pathname:`/infinite/${item.id}`as any,
                        })
                    }}
                >
                    <Text className='font-semibold text-gray-900' numberOfLines={1}>
                        {item.id}번, {item.title}
                    </Text>
                </Pressable>
            )}
            onEndReached={()=>{
                if(hasNextPage && !isFetchingNextPage){
                    fetchNextPage()
                }
            }}
            //30%가량 남으면 로딩
            onEndReachedThreshold={0.3}
            //바닥에 로딩바(선택)
            ListFooterComponent={
                isFetchingNextPage?(
                    <View>
                        <ActivityIndicator/>
                    </View>
                ):undefined
            }
        />
        
    )
}