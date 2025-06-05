import React, { useEffect, useState } from "react";
import { View, Text, Dimensions } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { FIRESTORE_DB } from "../../../../firebaseconfig";


export default function FeaturedBeer() {
  const [beer, setBeer] = useState(null);

  useEffect(() => {
    const fetchRandomBeer = async () => {
      const snapshot = await getDocs(collection(FIRESTORE_DB, "beers"));
      const beerList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      if (beerList.length > 0) {
        const randomIndex = Math.floor(Math.random() * beerList.length);
        setBeer(beerList[randomIndex]);
      }
    };

    fetchRandomBeer();
  }, []);

  if (!beer) {
    return (
      <View className="p-4">
        <Text className="text-gray-400">Loading random beer...</Text>
      </View>
    );
  }

  return (
    <View className="items-center w-full px-4">
      <View className="bg-yellow-100 border border-yellow-300 rounded-xl p-4 shadow w-full max-w-md">
        <Text className="text-lg font-semibold text-center mb-1">
          Featured Beer
        </Text>
        <Text className="text-base font-bold text-center">{beer.name}</Text>
        <Text className="text-sm text-gray-600 text-center mt-1">
          ABV : {beer.percentage}%
        </Text>
        <Text className="text-sm text-gray-600 text-center mt-1">
          {beer.country}
        </Text>
      </View>
    </View>
  );
}
