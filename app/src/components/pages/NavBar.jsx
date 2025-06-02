import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Navbar() {
  const navigation = useNavigation();

  return (
    <View className="flex-row justify-around items-center h-20 bg-teal-500 border-t border-gray-300">
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Text className="text-2xl">🏠</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Search")}>
        <Text className="text-2xl">🔍</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("PostBeer")}>
        <Text className="text-2xl">➕</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Map")}>
        <Text className="text-2xl">📍</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Camera")}>
        <Text className="text-2xl">📷</Text>
      </TouchableOpacity>
    </View>
  );
}
