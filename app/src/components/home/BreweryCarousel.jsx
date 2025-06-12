import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { FIRESTORE_DB } from "../../../../firebaseconfig";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");
const cardWidth = width / 3;

export default function BreweryCarousel() {
  const [breweries, setBreweries] = useState([]);
  const navigation = useNavigation()

  useEffect(() => {
    getDocs(collection(FIRESTORE_DB, "breweries")).then((snapshot) => {
      const breweryList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBreweries(breweryList);
    });
  }, []);

    return (
      <View className="flex-1 py-1">
        <FlatList
          data={breweries}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Brewery", { brewery: item.id })}
            >
              <View
                className="items-center justify-center px-2"
                style={{ width: cardWidth }}
              >
                <View className="bg-stone-800 border-4 border-gray-500 rounded-full p-4 w-full h-28 shadow-xl">
                  <Text className="bg-yellow-500 rounded-xl text-base font-bold text-center">
                    {item.name}
                  </Text>
                  <Text className="text-xs text-gray-100 text-center mt-1">
                    {item.location}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
