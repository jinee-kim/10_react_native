import { View, Text, FlatList, Pressable } from 'react-native'
import React, { useState } from 'react'
import { router } from 'expo-router'

export default function index() {

    interface Post{
        id:number,
        title:string,
        body:string,
    }

    const[post]=useState([
        {id:1,title:"첫번째 게시글",body:"첫번째 내용"},
        {id:2,title:"두번째 게시글",body:"두번째 내용"},
        {id:3,title:"세번째 게시글",body:"세번째 내용"},
    ])
    return (
      <View>
        <FlatList
            data={post}
            keyExtractor={(item)=>item.id.toString()}
            renderItem={({item}:{item:Post})=>(
                <Pressable
                    className='
                        p-4 m-4 bg-gray-50
                        border border-gray-200
                        rounded-xl active:bg-gray-300
                    '
                    onPress={()=>{
                        router.push({
                            pathname:"/flatlist/[id]",
                            params:{
                                id:item.id,
                                title:item.title,
                                body:item.body
                            }
                        })
                    }}
                >
                    <Text className='text-lg font-bold text-gray-800'>{item.title}</Text>
                    <Text className='text-gray-500 text-sm mt-1'>{item.body}</Text>
                </Pressable>
            )}
        >

        </FlatList>
        <Pressable 
            className='
                flex bg-blue-500 w-50 h-14 rounded-lg justify-center items-center
            '
            onPress={()=>{router.back()}}
        >
            <Text className='text-white font-bold text-base'>메인 화면으로</Text>
        </Pressable>
      </View>
    )
}