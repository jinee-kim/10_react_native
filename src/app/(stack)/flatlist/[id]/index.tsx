import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { router, useLocalSearchParams } from 'expo-router'

export default function index() {
    const{id,title,body}=useLocalSearchParams()

    return (
        <View>
            <View>
                <Text>
                    글 번호:{id}
                </Text>
                <Text>
                    글 제목:{title}
                </Text>
                <Text>
                    글 내용:{body}
                </Text>
            </View>
            <Pressable 
                className='
                    flex bg-blue-500 w-50 h-14 rounded-lg justify-center items-center
                '
                onPress={()=>{router.back()}}
            >
                <Text className='text-white font-bold text-base'>목록으로</Text>
            </Pressable>
        </View>
    )
}