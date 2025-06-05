import React from "react";
import { View, Text } from "react-native";
import Navbar from "./NavBar";
import HeaderNav from "./HeaderNav"
import BeerCarousel from "./BeerCarousel";
import BreweryCarousel from "./BreweryCarousel";
import FeaturedBeer from "./FeaturedBeer"
import FeaturedBrewery from "./FeaturedBrewery";


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

        <View className="py-4 space-y-6">
          <FeaturedBeer />
        </View>

        <View className="py-4 space-y-6">
          <FeaturedBrewery />
        </View>
      </View>

      <Navbar />
    </View>
  );
}