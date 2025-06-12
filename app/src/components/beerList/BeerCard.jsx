import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const defaultBeerImage = require("../../../../assets/images/default-beer-image.png");

function BeerCard({ beer, navigation, cardWidth }) {
  const isTwoColumn = cardWidth === "47%";
  return (
    <View
      key={beer.id}
      className="bg-white rounded-lg shadow-md mb-4 p-3"
      style={{
        elevation: 3,
        width: isTwoColumn ? "47%" : "100%",
        flexDirection: "column",
        alignItems: "center",
        overflow: "hidden",
        minHeight: 100,
        marginHorizontal: isTwoColumn ? "1.5%" : 0,
      }}
    >
      <Image
        source={beer.img_url ? { uri: beer.img_url } : defaultBeerImage}
        className="w-24 h-24"
        style={{ height: 80, width: 80 }}
      />
      <View className="flex-1">
        <Text className="text-lg font-semibold text-gray-900">{beer.name}</Text>
        <Text className="text-sm text-gray-600 mb-1">{beer.brewery}</Text>
        <Text className="text-sm text-gray-700">ABV: {beer.percentage}%</Text>
        <Text className="text-sm text-gray-500 mb-2">Votes: {beer.votes}</Text>

        <TouchableOpacity
          onPress={() => navigation.navigate("Beer", { beerID: beer.id })}
          className="bg-amber-700 rounded px-3 py-1.5 self-start"
        >
          <Text className="text-white font-semibold">View More</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

export default BeerCard;
