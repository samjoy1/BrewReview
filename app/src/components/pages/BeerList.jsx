import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { FIRESTORE_DB } from "../../../../firebaseconfig";

const defaultBeerImage = require("../../../../assets/images/default-beer-image.png");

function BeerList({ navigation }) {
  const [beers, setBeers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  //const [brewery, setBrewery] = useState("");

  useEffect(() => {
    const beerRef = collection(FIRESTORE_DB, "beers");
    getDocs(beerRef)
      .then((querySnapshot) => {
        //console.log(querySnapshot.docs[0].data())
        let compiledBeers = [];
        let newBeer = {};
        querySnapshot.docs.map((doc) => {
          newBeer = { ...doc.data() };
          newBeer.id = doc.id;
          compiledBeers.push(newBeer);
        });

        return compiledBeers;
      })
      .then((result) => {
        setBeers(result);
      });
  }, []);

  return (
    <ScrollView className="bg-gray-100 min-h-screen p-4">
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

      {/* <TextInput
        placeholder="Search beers..."
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
        className="bg-white p-3 rounded-lg mb-6 border border-gray-300"
        placeholderTextColor="#888"
      /> */}

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
              <Text className="text-sm text-gray-600 mb-1">{beer.brewery}</Text>
              <Text className="text-sm text-gray-700">
                ABV: {beer.percentage}%
              </Text>
              <Text className="text-sm text-gray-500 mb-2">
                Votes: {beer.votes}
              </Text>

              <TouchableOpacity
                onPress={() => navigation.navigate("Beer", { id: beer.id })}
                className="bg-blue-600 rounded px-3 py-1.5 self-start"
              >
                <Text className="text-white font-semibold">View More</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

export default BeerList;
