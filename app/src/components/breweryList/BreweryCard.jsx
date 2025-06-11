import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const defaultBreweryImage = require("../../../../assets/images/default-brewery-image.png");

function BreweryCard({ brewery, navigation, cardWidth = "48%" }) {
  if (!brewery) {
    return null;
  }

  return (
    <View
      key={brewery.id}
      className="bg-white rounded-lg shadow-md mb-4"
      style={{
        elevation: 3,
        width: cardWidth,
        flexDirection: "column",
        alignItems: "center",
        overflow: "hidden",
        minHeight: 200,
        padding: 8,
      }}
    >
      <Image
        source={
          brewery.img_url ? { uri: brewery.img_url } : defaultBreweryImage
        }
        className="w-24 h-24"
        style={{ height: 80, width: 80, resizeMode: "contain" }}
      />
      <View className="flex-1 w-full mt-2 items-center">
        <Text
          className="text-lg font-semibold text-gray-900 text-center"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {brewery.name}
        </Text>
        {brewery.country && (
          <Text className="text-sm text-gray-700 text-center">
            {brewery.country}
          </Text>
        )}
        {brewery.location && (
          <Text className="text-sm text-gray-500 mb-2 text-center">
            {brewery.location}
          </Text>
        )}
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Brewery", { breweryID: brewery.id })
          }
          className="bg-amber-700 rounded px-3 py-1.5 self-center mt-2"
        >
          <Text className="text-white font-semibold">View More</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default BreweryCard;
