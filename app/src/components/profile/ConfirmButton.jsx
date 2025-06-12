
// IMPORTS
import { useContext } from "react"
import { TouchableOpacity } from "react-native"
import { UserContext } from "../../../index"

export default function ConfirmButton ({ user, tempBackground, tempNavBarColour }) {
    let { setBackground, setNavBarColour } = useContext(UserContext)

    function updateUser () {
        setBackground(tempBackground)
        setNavBarColour(tempNavBarColour)
        let userCopy = {...user}
        userCopy.preferences.background = tempBackground
        userCopy.preferences.navBarColour = tempNavBarColour
    }

    return (
        <TouchableOpacity onPress={updateUser} className="text-center font-bold bg-green-400 rounded-xl p-4 mb-4">
            Confirm
        </TouchableOpacity>
    )
}