import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

function InfoButtons({
  type,
  country,
  rating,
  brewery,
  onTypeButtonPress,
  onCountryButtonPress,
  onRatingButtonPress,
  onBreweryButtonPress,
}) {
  return (
    <>
      <View className="flex-row mb-2 px-1">
        {/* TYPE */}
        <TouchableOpacity
          className="w-1/2 h-14 bg-white border border-gray-300 rounded-lg justify-center items-center"
          onPress={onTypeButtonPress}
        >
          <Text className="text-base font-bold text-center">{type}</Text>
        </TouchableOpacity>

        {/* COUNTRY */}
        <TouchableOpacity
          className="w-1/2 h-14 bg-white border border-gray-300 rounded-lg justify-center items-center"
          onPress={onCountryButtonPress}
        >
          <Text className="text-base font-bold text-center">{country}</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-row mb-4 px-1">
        {/* RATING */}

        <TouchableOpacity
          className="w-1/2 h-14 bg-white border border-gray-300 rounded-lg justify-center items-center"
          onPress={onRatingButtonPress}
        >
          <Text className="text-base font-bold text-center">{rating}</Text>
        </TouchableOpacity>

        {/* BREWERY */}
        <TouchableOpacity
          className="w-1/2 h-14 bg-white border border-gray-300 rounded-lg justify-center items-center"
          onPress={onBreweryButtonPress}
        >
          <Text className="text-base font-bold text-center">{brewery}</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

export default InfoButtons;
