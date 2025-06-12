
// IMPORTS
import { Text, TouchableOpacity, View } from "react-native"

//STYLING
let baseStyling = "rounded-full w-16 h-16 border-solid border-4 mr-3 hover:border-white "

export default function BgColourPicker ({ tempBackground, setTempBackground }) {
    return (
        <View className="mb-6">
            <Text className="text-white text-center font-bold w-48 bg-violet-900 rounded-t-xl ml-8 p-3">Background Colour</Text>
            <View className="flex-row flex-wrap justify-center bg-white rounded-full p-1 shadow-lg">
                <TouchableOpacity onPress={() => {setTempBackground("black")}}
                    className={"bg-black "+ baseStyling + (tempBackground==="black" ? "border-green-500" : "border-stone-400")}/>
                <TouchableOpacity onPress={() => {setTempBackground("white")}}
                    className={"bg-white "+ baseStyling + (tempBackground==="white" ? "border-green-500" : "border-stone-400")}/>
                <TouchableOpacity onPress={() => {setTempBackground("brown")}}
                    className={"bg-yellow-950 "+ baseStyling + (tempBackground==="brown" ? "border-green-500" : "border-stone-400")}/>
                <TouchableOpacity onPress={() => {setTempBackground("blue")}}
                    className={"bg-blue-400 "+ baseStyling + (tempBackground==="blue" ? "border-green-500" : "border-stone-400")}/>
                <TouchableOpacity onPress={() => {setTempBackground("yellow")}}
                    className={"bg-yellow-400 "+ baseStyling + (tempBackground==="yellow" ? "border-green-500" : "border-stone-400")}/>
                <TouchableOpacity onPress={() => {setTempBackground("green")}}
                    className={"bg-green-400 "+ baseStyling + (tempBackground==="green" ? "border-green-500" : "border-stone-400")}/>
            </View>
        </View>
    )
}