
// IMPORTS
import { Text, TouchableOpacity, View } from "react-native"

//STYLING
let baseStyling = "rounded-full w-16 h-16 border-solid border-4 mr-3 hover:border-white "

export default function NavColourPicker ( { tempNavbarColour, setTempNavbarColour }) {
    return (
        <View className="mb-4">
            <Text className="text-white text-center font-bold w-48 bg-violet-900 rounded-t-xl ml-8 p-3">NavBar Colour</Text>
            <View className="flex-row flex-wrap justify-center bg-white rounded-full p-1 shadow-lg mb-8">
                <TouchableOpacity onPress={() => {setTempNavbarColour("bg-stone-900")}}
                    className={"bg-black "+ baseStyling + (tempNavbarColour==="black" ? "border-green-500" : "border-stone-400")}/>
                <TouchableOpacity onPress={() => {setTempNavbarColour("bg-white")}}
                    className={"bg-white "+ baseStyling + (tempNavbarColour==="white" ? "border-green-500" : "border-stone-400")}/>
                <TouchableOpacity onPress={() => {setTempNavbarColour("bg-neutral-700")}}
                    className={"bg-neutral-700 "+ baseStyling + (tempNavbarColour==="brown" ? "border-green-500" : "border-stone-400")}/>
                <TouchableOpacity onPress={() => {setTempNavbarColour("bg-slate-800")}}
                    className={"bg-slate-800 "+ baseStyling + (tempNavbarColour==="blue" ? "border-green-500" : "border-stone-400")}/>
                <TouchableOpacity onPress={() => {setTempNavbarColour("bg-yellow-500")}}
                    className={"bg-yellow-500 "+ baseStyling + (tempNavbarColour==="yellow" ? "border-green-500" : "border-stone-400")}/>
                <TouchableOpacity onPress={() => {setTempNavbarColour("bg-green-800")}}
                    className={"bg-green-800 "+ baseStyling + (tempNavbarColour==="green" ? "border-green-500" : "border-stone-400")}/>
            </View>
        </View>

    )
}