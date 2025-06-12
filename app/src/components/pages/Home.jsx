
// IMPORTS
import { useContext } from "react";
import { ImageBackground, SafeAreaView, ScrollView, Text, View } from "react-native";
import { UserContext } from "../../../index";

// COMPONENTS
import Navbar from "./NavBar";
import HeaderNav from "./HeaderNav"
import { BeerCarousel, BreweryCarousel, FeaturedBeer, FeaturedBrewery } from "../home/index"

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
        <ScrollView className=""
            contentContainerStyle={{ paddingBottom: 200 }}
            showsVerticalScrollIndicator={false}>    
          <View className="flex-1">
            
            <Text className="text-white text-center bg-violet-900 rounded-t-xl text-lg font-semibold ml-16 w-40 p-2">Top Beers</Text>
            <View className="bg-white/80 shadow-lg mb-4">
              <BeerCarousel />
            </View>

            <Text className="text-white text-center bg-violet-900 rounded-t-xl text-lg font-semibold ml-16 w-40 p-2">Top Breweries</Text>
            <View className="bg-white/80 shadow-lg mb-4">
              <BreweryCarousel />
            </View>

            <Text className="text-white text-center bg-violet-900 rounded-t-xl text-lg font-semibold ml-16 w-40 p-2">Featured</Text>
            <View className="bg-white/80 shadow-lg mb-4">
              <View className="py-4 space-y-6">
                <FeaturedBeer />
              </View>
              <View className="py-4 space-y-6">
                <FeaturedBrewery />
              </View>
            </View>

          </View>
        </ScrollView>
      <Navbar colour={navbarColour}/>
      </ImageBackground>
    </SafeAreaView>

  );
}
