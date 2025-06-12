// IMPORTS
import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { UserContext } from "../../../index"

export default function Navbar({ colour }) {
  const navigation = useNavigation();

return (
  <View
    className={
      "flex-row justify-around items-center h-16 border-xl border-gray-300 shadow-xl m-5 p-5 rounded-xl " +
      colour
    }
    style={{
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
    }}
  >
    <TouchableOpacity onPress={() => navigation.navigate("Home")}>
      <Text className="text-xl">🏠</Text>
    </TouchableOpacity>


    <TouchableOpacity onPress={() => navigation.navigate("Categories")}>
      <Text className="text-xl">🔍</Text>
    </TouchableOpacity>


    <TouchableOpacity onPress={() => navigation.navigate("PostBeer")}>
      <View className="bg-green-400 rounded-full w-20 h-20 justify-center items-center border-4 border-gray">
        <Text className="text-4xl">➕</Text>
      </View>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => navigation.navigate("Map")}>
      <Text className="text-xl">📍</Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => navigation.navigate("Camera")}>
      <Text className="text-xl">📷</Text>
    </TouchableOpacity>
  </View>
);
}
