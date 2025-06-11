import React from "react";
import { Text, View } from "react-native";
import Navbar from "./NavBar";
import HeaderNav from "./HeaderNav"
import BeerCarousel from "../HomepageComponents/BeerCarousel";
import BreweryCarousel from "../HomepageComponents/BreweryCarousel";
import FeaturedBeer from "../HomepageComponents/FeaturedBeer"
import FeaturedBrewery from "../HomepageComponents/FeaturedBrewery";

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
