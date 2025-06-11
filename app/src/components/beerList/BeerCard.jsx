import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const defaultBeerImage = require("../../../../assets/images/default-beer-image.png");

function BeerCard({ beer, navigation }) {
  return (
    <View
      key={beer.id}
      className="bg-white rounded-lg shadow-md p-3"
      style={{
        elevation: 3,
        width: "48%",
        margin: "1%",
        minHeight: 230, 
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Image
        source={beer.img_url ? { uri: beer.img_url } : defaultBeerImage}
        className="w-24 h-24"
        style={{ height: 80, width: 80 }}
      />

      <View className="flex-1 mt-2 items-center">
        <Text className="text-lg font-semibold text-gray-900 text-center">
          {beer.name}
        </Text>
        <Text className="text-sm text-gray-600 text-center mb-1">
          {beer.brewery}
        </Text>
        <Text className="text-sm text-gray-700 text-center">
          ABV: {beer.percentage}%
        </Text>
        <Text className="text-sm text-gray-500 text-center mb-2">
          {beer.country}
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate("Beer", { beerID: beer.id })}
        className="bg-amber-700 rounded px-3 py-1.5 mt-2"
      >
        <Text className="text-white font-semibold">View More</Text>
      </TouchableOpacity>
    </View>
  );
}

export default BeerCard;
