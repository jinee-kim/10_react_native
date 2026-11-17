import AsyncStorage from "@react-native-async-storage/async-storage"
import {create} from "zustand"
import {persist,combine, createJSONStorage} from "zustand/middleware"


export const useCountStore=create(
    persist(
        combine(
            {
                count:0
            },
            (set)=>({
                increase:()=>set((state)=>({count:state.count+1})),
                decrease:()=>set((state)=>({count:state.count-1})),
            })
        ),
        {
            name:"count-store",
            storage:createJSONStorage(()=>AsyncStorage)
        }
    )
)
export default useCountStore;