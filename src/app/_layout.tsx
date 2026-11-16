import "@/global.css";
import { Slot } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ReactQueryProvider from "../../providers/reactQueryProvider";
import { QueryClient } from "@tanstack/react-query";

export default function TabLayout() {
    const[isReady,setIsReady]=useState(false)

    useEffect(()=>{
        setIsReady(true)
    },[])

    if(!isReady){ //로딩
        return(
            <SafeAreaView className="flex-1 bg-white">
                <View className="flex-1 bg-white"/>
            </SafeAreaView>
        )
    }

    return (
        <ReactQueryProvider>
            <SafeAreaView className="flex-1">
                <View className="flex-1">
                    <Slot/>
                </View>
            </SafeAreaView>
        </ReactQueryProvider>
    );
}
