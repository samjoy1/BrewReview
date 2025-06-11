import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FIRESTORE_DB } from "../../../../firebaseconfig";
import BreweryCard from "../breweryList/BreweryCard";
import Header from "./HeaderNav";
import Navbar from "./NavBar";

function BreweryList({ navigation }) {
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
      <View className="flex-1">
        <Header />
        <ScrollView
          className="p-4"
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-row justify-center mb-6">
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("BeerList");
              }}
              className="bg-white border border-gray-300 rounded-xl px-6 py-2 mx-4"
            >
              <Text className="text-black text-lg font-bold">Beers</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("BreweryList");
              }}
              className="bg-white border border-gray-300 rounded-xl px-6 py-2 mx-4"
            >
              <Text className="text-black text-lg font-bold">Breweries</Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row flex-wrap justify-between">
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
      </View>
      <Navbar />
    </SafeAreaView>
  );
}

export default BreweryList;
