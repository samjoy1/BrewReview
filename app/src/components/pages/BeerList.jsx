import { Picker } from "@react-native-picker/picker";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FIRESTORE_DB } from "../../../../firebaseconfig";
import Header from "./HeaderNav";
import Navbar from "./NavBar";

const defaultBeerImage = require("../../../../assets/images/default-beer-image.png");

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
    <SafeAreaView>
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
          <Picker
            selectedValue={sortField}
            onValueChange={(itemValue) => setSortField(itemValue)}
          >
            <Picker.Item label="Votes" value="votes" />
            <Picker.Item label="Name" value="name" />
            <Picker.Item label="ABV" value="percentage" />
          </Picker>

          <Picker
            selectedValue={sortDirection}
            onValueChange={(itemValue) => setSortDirection(itemValue)}
          >
            <Picker.Item label="Descending" value="desc" />
            <Picker.Item label="Ascending" value="asc" />
          </Picker>
        </View>

        <View className="flex-row flex-wrap space-between">
          {beers.map((beer) => (
            <View
              key={beer.id}
              className="bg-white rounded-lg shadow-md mb-4 p-3"
              style={{
                elevation: 3,
                width: "48%",
                flexDirection: "column",
                alignItems: "center",
                overflow: "hidden",
                minHeight: 100,
              }}
            >
              <Image
                source={beer.img_url ? { uri: beer.img_url } : defaultBeerImage}
                className="w-24 h-24"
                style={{ height: 80, width: 80 }}
              />
              <View className="flex-1">
                <Text className="text-lg font-semibold text-gray-900">
                  {beer.name}
                </Text>
                <Text className="text-sm text-gray-600 mb-1">
                  {beer.brewery}
                </Text>
                <Text className="text-sm text-gray-700">
                  ABV: {beer.percentage}%
                </Text>
                <Text className="text-sm text-gray-500 mb-2">
                  Votes: {beer.votes}
                </Text>

                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Beer", { beerID: beer.id })
                  }
                  className="bg-amber-700 rounded px-3 py-1.5 self-start"
                >
                  <Text className="text-white font-semibold">View More</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <Navbar />
    </SafeAreaView>
  );
}

export default BeerList;
