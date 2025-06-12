import { useContext } from "react"
import { TouchableOpacity } from "react-native"

import { UserContext } from "../../../index"

export default function LogoutButton ({ navigation }) {
    let { setIsLoggedIn, setLoggedInUser } = useContext(UserContext)
    return (
        <TouchableOpacity className="text-center font-bold bg-gray-300 rounded-xl p-4 mb-4"
            onPress={() => { 
            navigation.navigate("Home")
            setIsLoggedIn(false)
            setLoggedInUser(null)
        }}  
            >
            Logout
        </TouchableOpacity>
    )
}