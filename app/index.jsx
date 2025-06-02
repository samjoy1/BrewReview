import { Text, View } from "react-native";
import ListOfBeers from "./ListOfBeers";
import React from "react";
import "@/global.css";

// components
import { Beer, Brewery, Camera, Categories, Home, Login, Map, PostBeer, PostReview, Profile, Search, Settings, User, Users } from "./src/components/pages/Componentsindex"

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-red-300">
      <Beer/>
    </View>
  );
}
