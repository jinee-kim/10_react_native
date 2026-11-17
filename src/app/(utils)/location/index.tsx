import { View, Text, TouchableOpacity, Alert } from 'react-native'
import * as Device from "expo-device";
import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import * as Location from "expo-location"

interface LocationData{
    latitude:number;
    longitude:number;
}

export default function index() {
    const [locationData,setLocationData]=useState<LocationData|null>(null)
    const[statusMessage,setStatusMessage]=useState<string>("버튼을 눌러 위치정보를 가져오세요")
    const buttonStyle = "m-4 p-3 bg-blue-500 rounded-lg"
    const textStyle = "flex justify-center text-white"

    const getLocation=async()=>{
        setStatusMessage("권한 확인중...")

        if(!Device.isDevice){
            Alert.alert("애뮬레이터(시뮬레이터) 실제 푸시토큰 발급이 되지 않습니다.")
            return
        }

        const {status}=await Location.requestForegroundPermissionsAsync()
        if(status!="granted"){
            setStatusMessage("위치 권한이 거부되었습니다.")
            return
        }
        
        const location=await Location.getCurrentPositionAsync({
            accuracy:Location.Accuracy.High,
        })
        const{latitude,longitude}=location.coords
        setLocationData({latitude,longitude})
        setStatusMessage("위치정보를 성공적으로 가져왔다.")
    }

    return (
      <View>
        {locationData?(
            <View>
                <Text className='text-[20px]'>위도(Lat): {locationData?.latitude}</Text>
                <Text className='text-[20px]'>경도(Lon): {locationData?.longitude}</Text>
            </View>
        )
        :
        (<Text>위치 정보가 존재하지 않습니다.</Text>)
        }
        <TouchableOpacity
            className={cn(buttonStyle)}
            onPress={getLocation}
        >
            <Text className={cn(textStyle)}>위치정보</Text>
        </TouchableOpacity>
      </View>
    )
}