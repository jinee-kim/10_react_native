import { View, Text, ScrollView, TouchableOpacity,Vibration } from 'react-native'
import * as Haptics from "expo-haptics"
import React from 'react'
import { cn } from '@/lib/utils'

export default function index() {

    const buttonStyle = "m-4 p-3 bg-blue-500 rounded-lg"
    const textStyle = "flex justify-center text-white"
    const triggerImpact=[
        {
            content: "가볍다",
            enum: Haptics.ImpactFeedbackStyle.Light
        },
        {
            content: "중간이다",
            enum: Haptics.ImpactFeedbackStyle.Medium
        },
        {
            content: "무겁다",
            enum: Haptics.ImpactFeedbackStyle.Heavy
        },
        {
            content: "단단하다",
            enum: Haptics.ImpactFeedbackStyle.Rigid
        }
    ]
    const triggerNotification=[
        {
            content: "성공이다",
            enum: Haptics.NotificationFeedbackType.Success
        },
        {
            content: "경고다",
                enum: Haptics.NotificationFeedbackType.Warning
            },
        {
            content: "오류다",
            enum: Haptics.NotificationFeedbackType.Error
        },
    ]
    const triggerDuration=[
        {
            content:"0.5초",
            duration:500
        },
        {
            content:"1초",
            duration:1000
        },
        {
            content:"2초",
            duration:2000
        },
    ]
    const triggerImpactButtons=triggerImpact.map((item,i)=>(
        <TouchableOpacity
            key={i}
            onPress={()=>{
                Haptics.impactAsync(item.enum)
            }}
            className={cn(buttonStyle)}
        >
            <Text className={cn(textStyle)}>핸드폰 진동!({item.content})</Text>
        </TouchableOpacity>
    ))

    const triggerNotificationButtons=triggerNotification.map((item,i)=>(
        <TouchableOpacity
            key={i}
            onPress={()=>(
                Haptics.notificationAsync(item.enum)
            )}
            className={cn(buttonStyle)}
        >
            <Text className={cn(textStyle)}>핸드폰 진동!({item.content})</Text>
        </TouchableOpacity>
    ))

    const triggerDurationButtons=triggerDuration.map((item,i)=>(
        <TouchableOpacity
            key={i}
            onPress={()=>(
                Vibration.vibrate(item.duration)
            )}
            className={cn(buttonStyle)}
        >
            <Text className={cn(textStyle)}>핸드폰 진동!({item.content})</Text>
        </TouchableOpacity>
    ))

    return (
      <ScrollView>
            <View>{triggerImpactButtons}</View>
            <View>{triggerNotificationButtons}</View>
            <View>{triggerDurationButtons}</View>
      </ScrollView>
    )
}