import { useContext } from "react";
import { Text, TouchableOpacity } from "react-native";

import { UserContext } from "../../../index";

export default function LogoutButton({ navigation }) {
  let { setIsLoggedIn, setLoggedInUser } = useContext(UserContext);
  return (
    <TouchableOpacity
      className="bg-gray-300 rounded-xl p-4 mb-4"
      onPress={() => {
        navigation.navigate("Home");
        setIsLoggedIn(false);
        setLoggedInUser(null);
      }}
    >
      <Text className="text-center font-bold text-black text-lg">Logout</Text>
    </TouchableOpacity>
  );
}
