// FIREBASE
import { FIREBASE_APP } from "@/firebaseconfig";
import { getAuth } from "firebase/auth";

// IMPORTS
import React, { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Image, Modal, Pressable, Text, TouchableOpacity, View } from "react-native";

import { UserContext } from "../../../index"

export default function Header({ colour }) {
  const auth = getAuth(FIREBASE_APP);
  const currentUser = auth.currentUser;

  const [menuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation();

  let { isLoggedIn, loggedInUser } = useContext(UserContext)

  const handleNavigate = (screen) => {
    setMenuVisible(false);
    navigation.navigate(screen);
  };

  return (
    <View className={"h-16 flex-row items-center justify-between border-solid border-32 border-red-500 shadow-md px-4 relative m-4 rounded-xl "+colour}>
      <TouchableOpacity onPress={() => setMenuVisible(true)}>
        <Text className="text-white text-3xl">☰</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Image
          source={{
            uri: "https://i.imgur.com/NcshsBa.png",
          }}
          className="w-32 h-12 rounded-full bg-violet-900"
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => { isLoggedIn ? navigation.navigate("Profile") : console.log("not logged in!") }}
      >
        <Image
          source={{
            uri: "https://avatar.iran.liara.run/public",
          }}
          className="w-10 h-10 rounded-full"
        />
      </TouchableOpacity>

      <Modal
        visible={menuVisible}
        transparent
        onRequestClose={() => setMenuVisible(false)}
      >
        <Pressable className="flex-1" onPress={() => setMenuVisible(false)}>
          <View className="absolute top-16 left-4 bg-white rounded-lg shadow-md py-2 px-4 w-40">
            <TouchableOpacity onPress={() => handleNavigate("Home")}>
              <Text className="py-2 text-gray-800">Home</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate("BeerList");
              }}
            >
              <Text className="py-2 text-gray-800">All Beers</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate("BreweryList");
              }}
            >
              <Text className="py-2 text-gray-800">All Breweries</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleNavigate("Search")}>
              <Text className="py-2 text-gray-800">Search</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleNavigate("PostReview")}>
              <Text className="py-2 text-gray-800">Add Review</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleNavigate("Categories")}>
              <Text className="py-2 text-gray-800">More Categories</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleNavigate("Map")}>
              <Text className="py-2 text-gray-800">Map</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleNavigate("Settings")}>
              <Text className="py-2 text-gray-800">Settings</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}
