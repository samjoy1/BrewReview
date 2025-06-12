import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { FIRESTORE_DB } from "../../../../firebaseconfig";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");
const cardWidth = width / 3;



export default function BeerCarousel() {
  const [beers, setBeers] = useState([]);
  const navigation = useNavigation()

  useEffect(() => {
    getDocs(collection(FIRESTORE_DB, "beers")).then((snapshot) => {
      const beerList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBeers(beerList);
    });
  }, []);


  return (
    <View className="flex-1 py-1">
      <FlatList
        data={beers}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Beer", { beerID: item.id })}
          >
            <View className="px-2" style={{ width: cardWidth }}>
              <View className="bg-yellow-600 border-4 border-yellow-500 rounded-full p-4 w-full h-28 shadow-lg">
                <Text className="bg-yellow-500 rounded-full text-base font-bold text-center text-s">
                  {item.name}
                </Text>
                <Text className="text-xs text-white text-center mt-1">
                  {item.percentage}%
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
