import { View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import {File,Paths} from "expo-file-system"
import * as DocumentPicker from "expo-document-picker"
import * as Sharing from "expo-sharing"
import { cn } from '@/lib/utils'

export default function index() {
    const buttonStyle = "m-4 p-3 bg-blue-500 rounded-lg"
    const textStyle = "flex justify-center text-white"
    
    const [statusMessage, setStatusMessage] = useState<string>("내용을 입력하거나 저장하세요")
    const[inputText,setInputText]=useState<string>("")
    const[fileContent,setFileContent]=useState<string>("")

    const file=new File(Paths.document,"my_note.txt")
    //1. 사용자가 입력한 내용을 파일로 쓰기
    const writeFile=async()=>{
        try{
            if(!inputText.trim()){
                setStatusMessage("저장할 텍스트 입력!")
                return;
            }
            if(!file.exists){
                file.create()
            }
            await file.write(inputText)
            setStatusMessage("작성완료!")
            setInputText("")
            //다른 앱에 공유
            const isAvailable=await Sharing.isAvailableAsync()
            
            if(isAvailable){
                await Sharing.shareAsync(file.uri,{
                    dialogTitle:"공용 폴더 파일저장",
                    mimeType:"application/octet-stream",
                    UTI:"public.plain-text"
                })
                setStatusMessage("입력한 내용 저장완료")
            }

        }
        catch(error){
            setStatusMessage("파일쓰기중 오류발생")
        }
    }
    //2. 저장된 파일 읽어오기
    const readFile=async()=>{
        try{
            if(!file.exists){
                setStatusMessage("저장된 파일이 없습니다!")
                setFileContent("")
                return;
            }
            const content=await file.text()
            setFileContent(content)
            setInputText(content)
            setStatusMessage("파일을 읽어오는데 성공")
        }catch(error){
            setStatusMessage("파일을 읽어오는데 실패")
        }
    }

    //3. 파일 공유하기
    const shareFile=async()=>{
        try{
            if(!file.exists){
                setStatusMessage("저장된 파일이 없습니다!")
                setFileContent("")
                return;
            }
            const isAvailable=await Sharing.isAvailableAsync()

            if(isAvailable){
                await Sharing.shareAsync(file.uri,{
                    dialogTitle:"공용 폴더 파일저장",
                    mimeType:"application/octet-stream",
                    UTI:"public.plain-text"
                })
                setStatusMessage("입력한 내용 저장완료")
                setInputText("")
            }
            else{
                setStatusMessage("입력한 내용 저장실패!")
                setInputText("")
            }
        }
        catch(error){
            setStatusMessage("파일 공유중 오류발생!")
        }
    }

    //4. 기기내 다른파일 가져오기
    const pickExternalFile=async()=>{
        try{
            const result=await DocumentPicker.getDocumentAsync({
                type:"*/*", //파일 형식 지정
                copyToCacheDirectory:true //앱이 읽을 수 있게 캐시 사용 허가 여부
            })
            if(!result.canceled&&result.assets&&result.assets.length>0){
                const selectedFile=result.assets[0]
                const importedFile=new File(selectedFile.uri)
                const content=await importedFile.text()
                setFileContent(content)
                setStatusMessage("외부 파일을 읽어왔다.")
            }else{
                setStatusMessage("파일 선택이 취소됐다.")
            }

        }catch(error){
            setStatusMessage("파일 가져오는데서 문제가 발생했다.")
        }
    }

    return (
        <ScrollView>
            <View><Text>{statusMessage}</Text></View>
            <View>
                <TextInput
                    className='border border-gray-300 p-4 text-[16px] mb-4'
                    multiline
                    placeholder='파일로 저장할 내용을 입력해.'
                    value={inputText}
                    onChangeText={setInputText}
                />
            </View>
            <View>
                <TouchableOpacity
                    onPress={writeFile}
                    className={cn(buttonStyle)}
                >
                    <Text className={cn(textStyle)}>입력된 내용으로 저장!</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={readFile}
                    className={cn(buttonStyle)}
                >
                    <Text className={cn(textStyle)}>저장된 내용 읽기</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={shareFile}
                    className={cn(buttonStyle)}
                >
                    <Text className={cn(textStyle)}>파일 공유하기</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={pickExternalFile}
                    className={cn(buttonStyle)}
                >
                    <Text className={cn(textStyle)}>파일 가져오기</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}