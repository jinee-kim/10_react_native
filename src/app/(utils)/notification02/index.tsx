import { cn } from '@/lib/utils';
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from 'expo-constants';
import { useState } from 'react';
import { Alert, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true, // 알림음 재생
    shouldSetBadge: true, // 안 읽은 알람 개수 표시
    shouldShowBanner: true, // 배너 형태로 팝업
    shouldShowList: true, // 알림센터 드래그로 내리는 목록에 표시
    shouldShowAlert: true // 팝업 알림 표시 여부
  }),
});

export default function index() {
    const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
    const [statusMessage, setStatusMessage] = useState<string>("버튼을 눌러 토큰을 발급받으세요.")

    const buttonStyle = "m-4 p-3 bg-blue-500 rounded-lg"
    const textStyle = "flex justify-center text-white"

    const sendTestNotification=async()=>{
        Notifications.scheduleNotificationAsync({
            content:{
                title:"알림!",
                body:"앱 내부 알림 테스트",
                data:{
                    extraData:"전달할 데이터"
                },
            },
            trigger:{
                type:Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
                seconds:2
            }
        })
    }    
    
    return (
        <ScrollView>
            
            <Text>{statusMessage}</Text>

            {/* 토큰 발급 버튼 */}
            <View>
                <TouchableOpacity
                    onPress={sendTestNotification}
                    className={cn(buttonStyle)}
                >
                    <Text className={cn(textStyle)}>푸시 토큰 발급하기</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}