// IMPORTS
import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { UserContext } from "../../../index"

export default function Navbar({ colour }) {
  const navigation = useNavigation();

  return (
    <View className={"flex-row justify-around items-center h-20 border-xl border-gray-300 shadow-xl m-5 p-5 rounded-xl "+colour}>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Text className="text-3xl">🏠</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Search")}>
        <Text className="text-3xl">🔍</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("PostBeer")}>
        <Text className="text-4xl rounded-full bg-green-400 p-6 border-solid border-stone-900 border-8">➕</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Map")}>
        <Text className="text-3xl">📍</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Camera")}>
        <Text className="text-3xl">📷</Text>
      </TouchableOpacity>
    </View>
  );
}
