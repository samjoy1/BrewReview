import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Navbar from "./src/components/pages/NavBar";

export default function Home() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white">
      {/*This Profile button below is just for the time being since the one in the HeaderNav is not rendering */}
      <TouchableOpacity
        // thhis line below, need updating the query params once we have authentication to have the
        // the userID from the signed in user
        onPress={() => router.push("/Profile?userId=userId")}
        style={{ padding: 10, backgroundColor: "#eee", margin: 10 }}
      >
        <Text>Go to Profile</Text>
      </TouchableOpacity>

      <View className="flex-1 items-center justify-center">
        <Text className="text-xl font-bold">Welcome to Home</Text>
      </View>

      <Navbar />
    </View>
  );
}
