import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { FIRESTORE_DB } from "../../../../firebaseconfig";

const defaultBeerImage = require("../../../../assets/images/default-beer-image.png");

function Search({ navigation }) {
  const [beers, setBeers] = useState([]);
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
      <Text className="text-2xl font-bold mb-6 text-center text-black-600">
        All Beers
      </Text>

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
                Alcohol: {beer.percentage}%
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

export default Search;
