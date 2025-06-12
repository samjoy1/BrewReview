
// FIREBASE
import { FIRESTORE_DB } from "../../../../firebaseconfig";
import { collection, getDocs } from "firebase/firestore";

// IMPORTS
import { useContext, useEffect, useState } from "react";
import { ImageBackground, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { UserContext } from "../../../index"

// COMPONENTS
import Header from "./HeaderNav";
import Navbar from "./NavBar";
import BreweryCard from "../breweryList/BreweryCard";

// STYLING
let review_rating_button_selected = "font-bold text-center bg-sky-500 w-40 p-3"
let review_rating_button_unselected = "font-bold text-center bg-white w-40 p-3"


function BreweryList({ navigation }) {
  let { loggedInUser, background, navbarColour } = useContext(UserContext)

  const [breweries, setBrewery] = useState([]);

  useEffect(() => {
    const breweryRef = collection(FIRESTORE_DB, "breweries");

    getDocs(breweryRef)
      .then((querySnapshot) => {
        let compiledBreweries = [];
        querySnapshot.docs.forEach((doc) => {
          let newBrewery = { ...doc.data(), id: doc.id };
          compiledBreweries.push(newBrewery);
        });
        setBrewery(compiledBreweries);
      })
      .catch((err) => {
        console.error("Error fetching breweries:", err);
        // add a Toast.show here?
      });
  }, []);

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
      className="relative flex-shrink">

        <Header colour={navbarColour}/>
        <ScrollView
          className="p-8"
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-row justify-center mb-4">
            <TouchableOpacity onPress={() => { navigation.navigate("BeerList")}}
                className={review_rating_button_unselected+" rounded-l-xl"}>
                Beers
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate("BreweryList")}}
                className={review_rating_button_selected+" rounded-r-xl"}>
                Breweries
            </TouchableOpacity>
          </View>

          <View className="bg-white/80 rounded-xl p-4 flex-row flex-wrap justify-between shadow-lg">
            {breweries.map((brewery) => (
              <BreweryCard
                key={brewery.id}
                brewery={brewery}
                navigation={navigation}
                cardWidth="48%"
              />
            ))}
          </View>
        </ScrollView>
        <Navbar colour={navbarColour}/>
      </ImageBackground>
    </SafeAreaView>
  );
}

export default BreweryList;
