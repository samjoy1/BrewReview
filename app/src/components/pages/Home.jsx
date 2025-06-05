import React from "react";
import { View, Text } from "react-native";
import  Navbar  from "./NavBar";


export default function Home() {
  return (
    <View className="flex-1 bg-white">
      
      <View className="flex-1 items-center justify-center">
        <Text className="text-xl font-bold">Welcome to Home</Text>
      </View>
      
      <Navbar />

    </View>
  );
}
