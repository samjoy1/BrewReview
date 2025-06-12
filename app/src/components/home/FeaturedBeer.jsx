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
      <View className="bg-yellow-600 border-4 border-yellow-500 rounded-full p-4 w-full h-36 shadow-lg">
        <Text className="bg-teal-400 mx-32 mb-4 rounded-full text-base font-bold text-center shadow-lg">
          Featured Beer
        </Text>
        <Text className="bg-yellow-500 mx-32 rounded-full text-base font-bold text-center shadow-lg">{beer.name}</Text>
        <Text className="text-sm text-white text-center mt-1">
          ABV : {beer.percentage}%
        </Text>
        <Text className="text-sm text-white text-center mt-1">
          {beer.country}
        </Text>
      </View>
    </View>
  );
}
