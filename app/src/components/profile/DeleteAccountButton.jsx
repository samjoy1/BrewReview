import { TouchableOpacity } from "react-native"

export default function DeleteAccountButton () {
    return (
            <TouchableOpacity className="text-center font-bold bg-red-400 rounded-xl p-4 mb-4">
                Delete Account
            </TouchableOpacity>
    )
}