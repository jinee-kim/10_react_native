import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import {AudioModule, AudioQuality, IOSOutputFormat, setAudioModeAsync, useAudioPlayer, useAudioPlayerStatus, useAudioRecorder, useAudioRecorderState} from "expo-audio"
import React, { useState } from 'react'
import { cn } from '@/lib/utils'

export default function index() {
    const[recordedUri,setRecordedUri]=useState<string|null>(null)
    const[statusMessage,setStatusMessage]=useState<string>("버튼을 눌러 녹음을 시작")

    const buttonStyle = "m-4 p-3 bg-blue-500 rounded-lg"
    const textStyle = "flex justify-center text-white text-[20px]"


    const audioRecorder = useAudioRecorder({
        extension: '.m4a',
        sampleRate: 44100,
        numberOfChannels: 2,
        bitRate: 128000,
        // 안드로이드
        android: {
            outputFormat: 'mpeg4',
            audioEncoder: 'aac',
        },
        // IOS
        ios: {
            outputFormat: IOSOutputFormat.MPEG4AAC,
            audioQuality: AudioQuality.MAX,
            linearPCMBitDepth: 16,
            linearPCMIsBigEndian: false,
            linearPCMIsFloat: false,
        },
        // 웹
        web: {
            mimeType: 'audio/webm',
            bitsPerSecond: 128000,
        },
    })
    const player=useAudioPlayer(recordedUri)

    const recordState=useAudioRecorderState(audioRecorder)

    const playerState=useAudioPlayerStatus(player)

    let timeText="00:00";
    let timeColor="#d9d9d9"

    const formatTime=(seconds:number)=>{
        const totalSeconds=Math.floor(seconds||0)
        const minutes=Math.floor(totalSeconds/60)
        const secs=totalSeconds%60
        return `${String(minutes).padStart(2,"0")}:${String(secs).padStart(2,"0")}`
    }

    if(recordState.isRecording){
        timeText=`${formatTime(recordState.durationMillis/1000)}`
        timeColor="#ef4444"
    }
    else if(recordedUri){
        const prefix=playerState.playing?"▶":""
        timeText=`${prefix}${formatTime(playerState.currentTime)}/${formatTime(playerState.duration)}`
        timeColor=playerState.playing?"#2563eb":"#9ca3af"
    }

    const startRecording=async()=>{
        const permission=await AudioModule.requestRecordingPermissionsAsync()
        if(!permission.granted){
            setStatusMessage("마이크 권한 거부!")
            return
        }
        if(playerState.playing){
            player.pause()
        }
        await setAudioModeAsync({
            allowsRecording:true,
            playsInSilentMode:true,
        })
        await audioRecorder.prepareToRecordAsync()
        audioRecorder.record()
        setStatusMessage("녹음중...")
    }
    const stopRecording=async()=>{
        await audioRecorder.stop()

        await setAudioModeAsync({
            allowsRecording:false,
            playsInSilentMode:true,
        })
        setRecordedUri(audioRecorder.uri)
        setStatusMessage("녹음 완료!")
    }
    const playRecording=async()=>{
        if(!recordedUri){
            setStatusMessage("재생할 녹음이 없습니다!")
            return;
        }
        player.seekTo(0)
        player.play()
        setStatusMessage("녹음파일 재생중...")
    }


    return (
        <ScrollView>
            <Text>녹음기</Text>
            <Text className='font-variant-numeric-[tabular-nums]'>{timeText}</Text>
            <Text>{statusMessage}</Text>
            <View>
                <TouchableOpacity
                    className="m-4 p-3 bg-blue-500 rounded-lg"
                    onPress={startRecording}
                >
                    <Text className={cn(textStyle)}>녹음시작</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className="m-4 p-3 bg-red-500 rounded-lg"
                    onPress={stopRecording}
                >
                    <Text className={cn(textStyle)}>녹음중지</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className="m-4 p-3 bg-green-500 rounded-lg"
                    onPress={playRecording}
                >
                    <Text className={cn(textStyle)}>녹음재생</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}