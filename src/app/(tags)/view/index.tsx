import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

export default function index() {
    return (
        <View className='flex-1 flex-col'>
            <Text>리액트 네이티브에는 HTML의 개념이 없다.</Text>
            <Text>p,span,h1등의 태그들은 모두 텍스트 태그의 역할을 수행한다.</Text>
            <Text>또한 View는 Div태그의 역할을 수행한다.</Text>
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