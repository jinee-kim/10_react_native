import { View, Text, TouchableOpacity } from 'react-native'
import {CameraType, CameraView, useCameraPermissions,useMicrophonePermissions} from "expo-camera"
import React, { useEffect, useRef, useState } from 'react'
import {} from 'expo-image-picker'
import{useVideoPlayer,VideoView}from "expo-video"
import { useEvent } from 'expo'
import { cn } from '@/lib/utils'

export default function index() {
    //카메라/마이크 접근권한관리
    const[cameraPermission,requestCameraPermission]=useCameraPermissions()
    const[microphonePermission,requestMicrophonePermission]=useMicrophonePermissions()

    //카메라 타입관리
    const cameraRef=useRef<CameraView>(null);
    const[facing,setFacing]=useState<CameraType>("back");
    const [isCameraReady,setCameraReady]=useState(false)

    const [mode,setMode]=useState<"camera"|"preview">("camera")
    const[videoUri,setVideoUri]=useState<string|null>(null)
    const [isRecording,setIsRecording]=useState(false)

    //녹화 경과시간
    const[recordSec,setRecordSec]=useState<number>(0)
    const timerRef=useRef<ReturnType<typeof setInterval>|null>(null)

    const player=useVideoPlayer(videoUri,(p)=>{
        p.loop=false
        p.timeUpdateEventInterval=0.5
    })
    const{isPlaying}=useEvent(player,"playingChange",{isPlaying:player.playing})
    const {currentTime}=useEvent(player,"timeUpdate",{
        currentTime:player.currentTime,
        currentLiveTimestamp:null,
        currentOffsetFromLive:null,
        bufferedPosition:0,
    })

    const formatTime = (seconds: number) => {
        const totalSeconds = Math.floor(seconds || 0)
        const minutes = Math.floor(totalSeconds / 60)
        const secs = totalSeconds % 60 
        return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`
    }

    useEffect(()=>{
        return()=>{
            if(timerRef.current) clearInterval(timerRef.current)
        }
    },[])

    //녹화시작
    
    const actionButton="flex-1 py-4 rounded-xl items-center"
    const actionText="text-white font-bold text-base"
    const circleButton="w-16 h-15 rounded-full bg-gray-700 justify-center items-center"

    if(!cameraPermission||!microphonePermission){
        return <View className="flex-1 bg-white"></View>
    }
    if(!cameraPermission.granted||!microphonePermission.granted){
        return(
            <View>
                <TouchableOpacity
                    onPress={async()=>{
                        await requestCameraPermission()
                        await requestMicrophonePermission()
                    }}
                >
                    <Text>권한 허용</Text>
                </TouchableOpacity>
            </View>
        )
    }

    //재생화면
    if(mode==="preview"&&videoUri){
        <View className='flex-1 bg-black'>
            <VideoView
                player={player}
                style={{flex:1}}
                contentFit='contain'
                nativeControls={false}
            />
            <Text
                className={cn("absolute top-[60px] self-center text-[22px] font-bold tabular-nums",
                    isPlaying?"text-blue-400":"text-gray-400"
                )}    
            >
                {isPlaying?"▶":""}
                {formatTime(currentTime)}/{formatTime(player.duration)}
            </Text>
            <View>
                <TouchableOpacity
                    onPress={()=>{}}
                    className={cn(actionButton,"bg-gray-600")}
                >
                        <Text className={cn(actionText)}>다시 촬영</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=>{}}
                    className={cn(actionButton,"bg-blue-600")}
                >
                        <Text className={cn(actionText)}>{isPlaying?"일시정지":"재생"}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=>{}}
                    className={cn(actionButton,"bg-green-600")}
                >
                        <Text className={cn(actionText)}>업로드</Text>
                </TouchableOpacity>
            </View>
        </View>
    }

    return (
        <View className='flex-1 bg-black'>
            <CameraView
                ref={cameraRef}
                style={{flex:1}}
                facing={facing}
                mode="video"
                onCameraReady={()=>setCameraReady(true)}
            >
            </CameraView>
            <Text
                className={cn("absolute top-[60px] self-center text-[22px] font-bold tabular-nums",
                    isRecording?"text-red-400":"text-gray-400"
                )}    
            >
                {isRecording?"●":""}
                {formatTime(recordSec)}
            </Text>
            <View>
                <TouchableOpacity
                    disabled={isRecording}
                    onPress={()=>setFacing((f)=>(f==="back"?"front":"back"))}
                    className={cn(circleButton,isRecording&&"opacity-40")}
                >
                    <Text className='text-white font-bold'></Text>
                </TouchableOpacity>

                <TouchableOpacity
                    disabled={!isCameraReady}
                    onPress={()=>{}}
                    className="w-20 h-20 rounded-full border-4 border-white justify-center items-center"
                >
                    <View
                        className={cn("bg-red-500",isRecording?"w-[30px] h-[30px] rounded-md":"w-[60px] h-[60px] rounded-full")}
                    >
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    disabled={!videoUri||isRecording}
                    onPress={()=>{}}
                    className={cn(circleButton,(!videoUri||isRecording)&&"opacity-40")}
                >
                    <Text className='text-white font-bold'>보기</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}