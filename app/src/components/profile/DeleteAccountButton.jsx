import { TouchableOpacity, Text } from "react-native"

export default function DeleteAccountButton () {
    return (
            <TouchableOpacity className="bg-red-400 rounded-xl p-4 mb-4">
            <Text className="text-center font-bold text-white text-lg">Delete Account</Text>
            </TouchableOpacity>
    )
}