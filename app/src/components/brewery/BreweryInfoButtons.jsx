import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

function BreweryInfoButtons({
  country,
  name,
  city,
  url,
  foundedDate,
  onBeersButtonPress,
  onUrlButtonPress,
  onCountryButtonPress,
  onCityButtonPress
}) {
  return (
    <>
      <View className="flex-row mb-2 px-1">
        {/* BEERS */}
        <TouchableOpacity
          className="w-1/2 h-14 bg-white border border-gray-300 rounded-lg justify-center items-center"
          onPress={onBeersButtonPress}
        >
          <Text className="text-base font-bold text-center">
            Beer collection
          </Text>
        </TouchableOpacity>

        {/* LOCATION */}
        <TouchableOpacity
          className="w-1/2 h-14 bg-white border border-gray-300 rounded-lg justify-center items-center"
          onPress={onCountryButtonPress}
        >
          <Text className="text-base font-bold text-center">
            Beers from {country}
          </Text>
        </TouchableOpacity>
      </View>

      <View className="flex-row mb-4 px-1">
        {/* URL */}
        <TouchableOpacity
          className="w-1/2 h-14 bg-white border border-gray-300 rounded-lg justify-center items-center"
          onPress={onUrlButtonPress}
        >
          <Text className="text-base font-bold text-center">
            Website
          </Text>
        </TouchableOpacity>

        {/* MAP */}
        <TouchableOpacity
          className="w-1/2 h-14 bg-white border border-gray-300 rounded-lg justify-center items-center"
          onPress={onCityButtonPress}
        >
          <Text className="text-base font-bold text-center">
            Map view
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

export default BreweryInfoButtons;
