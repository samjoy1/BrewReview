import React from "react";
import { View, Text } from "react-native";
import Navbar from "./NavBar";
import HeaderNav from "./HeaderNav"
import BeerCarousel from "./BeerCarousel";
import BreweryCarousel from "./BreweryCarousel";

export default function Home() {
  return (
    <View className="flex-1 bg-white">
      <HeaderNav />

      <View className="flex-1">
        <View>
          <Text className="text-lg font-semibold mb-1 p-3">Top Beers</Text>
          <BeerCarousel />
        </View>

        <View>
          <Text className="text-lg font-semibold mb-1 p-3">Top Breweries</Text>
          <BreweryCarousel />
        </View>

        
        <View className="p-6 space-y-6">
          <View className="bg-yellow-100 p-4 rounded-lg shadow">
            <Text className="text-lg font-semibold mb-1">🍺 Featured Beer</Text>
            <Text className="text-base text-gray-800">Hoppy Heaven IPA</Text>
            <Text className="text-sm text-gray-600">
              ABV: 6.5% · Bold and citrusy
            </Text>
          </View>
        </View>

        <View className="p-6 space-y-6">
          <View className="bg-blue-100 p-4 rounded-lg shadow">
            <Text className="text-lg font-semibold mb-1">
              🏭 Spotlight Brewery
            </Text>
            <Text className="text-base text-gray-800">
              Golden Valley Brewing Co.
            </Text>
            <Text className="text-sm text-gray-600 ">
              Portland, OR · Known for barrel-aged stouts
            </Text>
          </View>
        </View>
      </View>

      <Navbar />
    </View>
  );
}