// FIREBASE
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { FIRESTORE_DB } from "../../../../firebaseconfig";

// IMPORTS
import { useContext, useEffect, useState } from "react";
import {
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

import { UserContext } from "../../../index";

// COMPONENTS
import { BeerCard, Loading, SortBy } from "../beerList/Index";
import Header from "./HeaderNav";
import Navbar from "./NavBar";

// STYLING
let review_rating_button_selected = "bg-sky-500 w-40 p-3";
let review_rating_button_unselected = "bg-white w-40 p-3";

function BeerList({ navigation }) {
  let { loggedInUser, background, navbarColour } = useContext(UserContext);

  const [beers, setBeers] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");

  useEffect(() => {
    const beerRef = collection(FIRESTORE_DB, "beers");
    const beerQuery = query(beerRef, orderBy(sortField, sortDirection));

    getDocs(beerQuery)
      .then((querySnapshot) => {
        let compiledBeers = [];
        querySnapshot.docs.forEach((doc) => {
          let newBeer = { ...doc.data(), id: doc.id };
          compiledBeers.push(newBeer);
        });

        setBeers(compiledBeers);
      })
      .catch((err) => {
        console.log("Error fetching All Beers", err);
        Toast.show({
          type: "error",
          text1: "Failed to fetch beer data",
          text2: err.message,
          position: "bottom",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [sortField, sortDirection]);

  return isLoading ? (
    <View>
      <Loading />
    </View>
  ) : (
    <SafeAreaView className="flex-1">
      <ImageBackground
        source={
          background === "black"
            ? require("../../../../assets/images/BR-bg-black.png")
            : background === "white"
            ? require("../../../../assets/images/BR-bg-white.png")
            : background === "green"
            ? require("../../../../assets/images/BR-bg-green.png")
            : background === "yellow"
            ? require("../../../../assets/images/BR-bg-yellow.png")
            : background === "blue"
            ? require("../../../../assets/images/BR-bg-blue.png")
            : background === "brown"
            ? require("../../../../assets/images/BR-bg-brown.png")
            : require("../../../../assets/images/BR-bg-black.png")
        }
        className="relative flex-1"
      >
        <Header colour={navbarColour} />
        <ScrollView
          className="p-4"
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-row justify-center mb-4">
            <TouchableOpacity
              onPress={() => {}}
              className={review_rating_button_selected + " rounded-l-xl"}
            >
              <Text className="font-bold text-center text-white">Beers</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("BreweryList");
              }}
              className={review_rating_button_unselected + " rounded-r-xl"}
            >
              <Text className="font-bold text-center text-black">
                Breweries
              </Text>
            </TouchableOpacity>
          </View>

          <View className="bg-white rounded-lg p-2 mb-4 shadow-lg">
            <Text className="font-semibold text-gray-700 mb-1">Sort by:</Text>
            <SortBy
              sortField={sortField}
              setSortField={setSortField}
              sortDirection={sortDirection}
              setSortDirection={setSortDirection}
            />
          </View>

          <View className="bg-white/80 rounded-xl p-4 flex-row flex-wrap justify-between shadow-lg">
            {beers.map((beer) => (
              <BeerCard
                key={beer.id}
                beer={beer}
                navigation={navigation}
                cardWidth="47%"
              />
            ))}
          </View>
        </ScrollView>
      </ImageBackground>
      <Navbar colour={navbarColour} />
    </SafeAreaView>
  );
}

export default BeerList;
