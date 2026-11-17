import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import * as ImagePicker from "expo-image-picker"
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { Image } from 'expo-image'

export default function index() {
    const buttonStyle="m-4 p-3 bg-blue-500 rounded-lg"
    const textStyle="flex justify-center text-white text-[20px] font-bold"

    const [selectedImage,setSelectedImage]=useState<string|null>(null);

    const handleImagePick=async (sourceType:string)=>{
        const isGallery=sourceType==="gallery"

        const permissionResult=isGallery
            ? await ImagePicker.requestMediaLibraryPermissionsAsync()
            : await ImagePicker.requestCameraPermissionsAsync()

        if(!permissionResult.granted){
            Alert.alert("권한 거부됨. ",`${isGallery?"갤러리":"카메라"} 접근 권한이 필요합니다.`)
            return;
        }
        const result=isGallery
            ? await ImagePicker.launchImageLibraryAsync({
                allowsEditing:true,
                aspect:[4,3],
                quality:1
            })
            : await ImagePicker.launchCameraAsync({
                allowsEditing:true,
                aspect:[4,3],
                quality:1
            })
        if(!result.canceled){
            setSelectedImage(result.assets[0].uri)
        }
    }

    return (
        
        <ScrollView>
            <View className='flex mb-4 items-center'>
                {selectedImage?(
                    <Image
                        source={{uri:selectedImage}}
                        style={{width:256,height:256}}
                    />
                ):(
                    <View>
                        <Text>선택된 이미지가 없습니다.</Text>
                    </View>
                )}
            </View>
            <View>
                <TouchableOpacity
                    className={cn(buttonStyle)}
                    onPress={()=>handleImagePick("gallery")}
                >
                    <Text className={cn(textStyle)}>갤러리에서 선택</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className={cn(buttonStyle)}
                    onPress={()=>handleImagePick("camera")}
                >
                    <Text className={cn(textStyle)}>카메라로 촬영</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}