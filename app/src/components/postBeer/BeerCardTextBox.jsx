// IMPORTS
import { View, Text } from "react-native"

// STYLING
let text_box = "text-white bg-zinc-800 m-1 p-1 rounded-xl h-7 align-middle"
let text_box_gray = "italic text-zinc-500 bg-zinc-800 m-1 p-1 rounded-xl h-7 align-middle"

function BeerCardTextBox ({ text, placeholder }) {
    return (
        <View>
          { text ? 
            <Text className={text_box}>{text}</Text> 
            : 
            <Text className={text_box_gray}>{placeholder}</Text>
        }  
        </View>
    )
}

export default BeerCardTextBox