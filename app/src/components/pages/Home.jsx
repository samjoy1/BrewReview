import { getAuth } from "firebase/auth";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Navbar from "./NavBar";

export default function Home({ navigation }) {
  const DUMMY_USER_ID = "bigdog512";
  const auth = getAuth();
  const currentUser = auth.currentUser;

  return (
    <View className="flex-1 bg-white">
      {/*This Profile button below is just for the time being since the one in the HeaderNav is not rendering */}
      <TouchableOpacity
        onPress={() => {
          const userId = currentUser?.userId || DUMMY_USER_ID;
          navigation.navigate("Profile", { userId });
        }}
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
