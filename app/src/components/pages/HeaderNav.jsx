import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Header() {
  const [menuVisible, setMenuVisible] = useState(false);
   const navigation = useNavigation();

  const handleNavigate = (screen) => {
    setMenuVisible(false);
    navigation.navigate(screen);
  };

  return (
    <View className="h-16 bg-teal-500 flex-row items-center justify-between px-4 relative">
      <TouchableOpacity onPress={() => setMenuVisible(true)}>
        <Text className="text-white text-3xl">☰</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Image
          source={{
            uri: "https://i.imgur.com/NcshsBa.png",
          }}
          className="w-28 h-10 rounded-full"
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
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
