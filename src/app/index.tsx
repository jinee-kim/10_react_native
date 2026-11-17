import { cn } from "@/lib/utils";
import { Redirect, router } from "expo-router";
import { Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {

    const buttonStyle="m-4 p-3 bg-blue-500 rounded-lg"
    const textStyle="flex justify-center text-white text-[20px] font-bold"
    const tags=[
        "view","flatlist","stack","infinite","zustand","camera","notification01","notification02","location","audio"
    ]
    const tagList=tags.map((tag,i)=>(
        <Pressable
            key={i}
            onPress={()=>router.push(`/${tag}` as any)}
            className={cn(buttonStyle)}
        >
            <Text className={cn(textStyle)}>{tag}</Text>
        </Pressable>
    ))

    return (
        <ScrollView className="flex flex-col gap-5">
            <TouchableOpacity
                className="m-4 p-3 bg-blue-500 rounded-lg"
                onPress={()=>router.push("/home")}
            >
                <Text className="flex justify-center text-white text-[20px] font-bold">Tabs</Text>
            </TouchableOpacity>
            {tagList}
        </ScrollView>
    );
}