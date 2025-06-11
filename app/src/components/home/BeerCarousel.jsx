import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Dimensions } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { FIRESTORE_DB } from "../../../../firebaseconfig";

const { width } = Dimensions.get("window");
const cardWidth = width / 3;

export default function BeerCarousel() {
  const [beers, setBeers] = useState([]);

  useEffect(() => {
    getDocs(collection(FIRESTORE_DB, "beers")).then((snapshot) => {
      const beerList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBeers(beerList);
    });
  }, []);

  const renderItem = ({ item }) => (
    <View
      className="px-2"
      style={{ width: cardWidth }}
    >
      <View className="bg-teal-500 border border-gray-500 rounded-xl p-4 w-full h-24">
        <Text className="text-base font-bold text-center">{item.name}</Text>
        <Text className="text-xs text-white text-center mt-1">
          {item.percentage}%
        </Text>
      </View>
    </View>
  );

  return (
    <View className="flex-1 py-1">
      <FlatList
        data={beers}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}
