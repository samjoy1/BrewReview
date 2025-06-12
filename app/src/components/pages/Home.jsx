import React, { useContext } from "react";
import { ImageBackground, SafeAreaView, ScrollView, Text, View } from "react-native";
import { UserContext } from "../../../index";

import { BeerCarousel, BreweryCarousel, FeaturedBeer, FeaturedBrewery } from "../home/index"

import HeaderNav from "./HeaderNav";
import Navbar from "./NavBar";

export default function Home() {
  let { loggedInUser, background, navbarColour } = useContext(UserContext)

  return (
    <SafeAreaView className="flex-1">
      <ImageBackground source={
        background==="black" ? require("../../../../assets/images/BR-bg-black.png") : 
        background==="white" ? require("../../../../assets/images/BR-bg-white.png") : 
        background==="green" ? require("../../../../assets/images/BR-bg-green.png") : 
        background==="yellow" ? require("../../../../assets/images/BR-bg-yellow.png") :
        background==="blue" ? require("../../../../assets/images/BR-bg-blue.png") :
        background==="brown" ? require("../../../../assets/images/BR-bg-brown.png") :
        require("../../../../assets/images/BR-bg-black.png")
      }
        className="relative flex-shrink bg-scroll">
        <HeaderNav colour={navbarColour}/>  
        <ScrollView className="p-4"
            contentContainerStyle={{ paddingBottom: 200 }}
            showsVerticalScrollIndicator={false}>    
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
        </ScrollView>
      <Navbar colour={navbarColour}/>
      </ImageBackground>
    </SafeAreaView>

  );
}
