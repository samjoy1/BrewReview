import { Button } from "@react-navigation/elements";
import React from "react";
import { Text, View } from "react-native";
import Navbar from "./NavBar";

export default function Home({ navigation }) {
  return (
    <View className="flex-1 bg-white">
      {/*This Profile button below is just for the time being since the one in the HeaderNav is not rendering */}
      <Button
        onPress={() => {
          navigation.navigate("Profile");
        }}
      >
        <Text>Profile</Text>
      </Button>
      <View className="flex-1 items-center justify-center">
        <Text className="text-xl font-bold">Welcome to Home</Text>
      </View>

      <Navbar />
    </View>
  );
}
