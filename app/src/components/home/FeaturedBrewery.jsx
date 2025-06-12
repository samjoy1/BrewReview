import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { FIRESTORE_DB } from "../../../../firebaseconfig";
import { Linking } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function FeaturedBrewery() {
  const [brewery, setBrewery] = useState(null);
  const navigation = useNavigation()

  useEffect(() => {
    const fetchRandomBrewery = async () => {
      const snapshot = await getDocs(collection(FIRESTORE_DB, "breweries"));
      const breweryList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      if (breweryList.length > 0) {
        const randomIndex = Math.floor(Math.random() * breweryList.length);
        setBrewery(breweryList[randomIndex]);
      }
    };

    fetchRandomBrewery();
  }, []);

  if (!brewery) {
    return (
      <View className="p-4">
        <Text className="text-gray-400 text-center">
          Loading featured brewery...
        </Text>
      </View>
    );
  }

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Brewery", { breweryID: brewery.id })}
    >
      <View className="items-center w-full px-4">
        <View className="bg-stone-800 border-4 border-gray-500 rounded-full p-4 w-full h-48 shadow-xl">
          <Text className="bg-teal-400 mx-32 mb-4 rounded-full text-base font-bold text-center shadow-lg">
            Featured Brewery
          </Text>
          <Text className="bg-yellow-500 mx-32 rounded-full text-base font-bold text-center shadow-lg">
            {brewery.name}
          </Text>
          <Text className="text-sm text-white text-center mt-1">
            Country: {brewery.country}
          </Text>
          <Text
            className="text-sm text-blue-600 text-center mt-1 underline"
            onPress={() => Linking.openURL(brewery.url)}
          >
            {brewery.url}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
