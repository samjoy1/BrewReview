import { Text, View } from "react-native";
import ListOfBeers from "./ListOfBeers";
import React from "react";
import "@/global.css";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-red-300">
      <ListOfBeers />
    </View>
  );
}
