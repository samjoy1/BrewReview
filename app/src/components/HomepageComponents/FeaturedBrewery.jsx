import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { FIRESTORE_DB } from "../../../../firebaseconfig";
import { Linking } from "react-native";

export default function FeaturedBrewery() {
  const [brewery, setBrewery] = useState(null);

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
    <View className="items-center w-full px-4">
      <View className="bg-yellow-500 border border-yellow-300 rounded-xl p-4 shadow w-full max-w-md">
        <Text className="text-lg font-semibold text-center mb-1">
          Featured Brewery
        </Text>
        <Text className="text-base font-bold text-center">{brewery.name}</Text>
        <Text className="text-sm text-gray-600 text-center mt-1">
          Country: {brewery.country}
        </Text>
          <Text className="text-sm text-blue-600 text-center mt-1 underline"
          onPress={() => Linking.openURL(brewery.url)}>
            {brewery.url}
          </Text>
      </View>
    </View>
  );
}
