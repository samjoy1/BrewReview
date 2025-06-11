import { collection, getDocs, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FIRESTORE_DB } from "../../../../firebaseconfig";
import { SortBy, BeerCard } from "../beerList/Index";
import Header from "./HeaderNav";
import Navbar from "./NavBar";


function BeerList({ navigation }) {
  const [beers, setBeers] = useState([]);

  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");

  useEffect(() => {
    const beerRef = collection(FIRESTORE_DB, "beers");
    const beerQuery = query(beerRef, orderBy(sortField, sortDirection));

    getDocs(beerQuery).then((querySnapshot) => {
      let compiledBeers = [];
      querySnapshot.docs.forEach((doc) => {
        let newBeer = { ...doc.data(), id: doc.id };
        compiledBeers.push(newBeer);
      });

      setBeers(compiledBeers);
    });
  }, [sortField, sortDirection]);

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

          <View className="bg-white rounded-lg p-2 mb-4">
            <Text className="font-semibold text-gray-700 mb-1">Sort by:</Text>
            <SortBy
              sortField={sortField}
              setSortField={setSortField}
              sortDirection={sortDirection}
              setSortDirection={setSortDirection}
            />
          </View>

          <View className="flex-row flex-wrap space-between">
            {beers.map((beer, i) => (
               <BeerCard key={i} beer={beer} navigation={navigation} />
            ))}
          </View>
        </ScrollView>
      </View>
      <Navbar />
    </SafeAreaView>
  );
}

export default BeerList;
