import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { FIRESTORE_DB } from "../../../../firebaseconfig";

const defaultBeerImage = require("../../../../assets/images/default-brewery-image.png");

function BreweryList({ navigation }) {
  const [breweries, setBrewery] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  //const [brewery, setBrewery] = useState("");

  useEffect(() => {
    const breweryRef = collection(FIRESTORE_DB, "breweries");
    getDocs(breweryRef)
      .then((querySnapshot) => {
        //console.log(querySnapshot.docs[0].data())
        let breweries = [];
        let newBrewery = {};
        querySnapshot.docs.map((doc) => {
          newBrewery = { ...doc.data() };
          newBrewery.id = doc.id;
          breweries.push(newBrewery);
        });

        return breweries;
      })
      .then((result) => {
        setBrewery(result);
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
        {breweries.map((brewery) => (
          <View
            key={brewery.id}
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
              source={
                brewery.img_url ? { uri: brewery.img_url } : defaultBeerImage
              }
              className="w-24 h-24"
              style={{ height: 80, width: 80 }}
            />
            <View className="flex-1">
              <Text className="text-lg font-semibold text-gray-900">
                {brewery.name}
              </Text>
              <Text className="text-sm text-gray-600 mb-1">
                {brewery.brewery}
              </Text>
              <Text className="text-sm text-gray-700">
                Country: {brewery.country}
              </Text>
              <Text className="text-sm text-gray-500 mb-2">
                City: {brewery.location}
              </Text>

              <TouchableOpacity
                onPress={() => navigation.navigate("Beer", { id: brewery.id })}
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

export default BreweryList;
