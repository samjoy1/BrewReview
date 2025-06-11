import { collection, getDocs, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { FIRESTORE_DB } from "../../../../firebaseconfig";
import { BeerCard, Loading, SortBy } from "../beerList/Index";
import Header from "./HeaderNav";
import Navbar from "./NavBar";

function BeerList({ navigation }) {
  const [beers, setBeers] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");

  useEffect(() => {
    const beerRef = collection(FIRESTORE_DB, "beers");
    const beerQuery = query(beerRef, orderBy(sortField, sortDirection));

    getDocs(beerQuery)
      .then((querySnapshot) => {
        let compiledBeers = [];
        querySnapshot.docs.forEach((doc) => {
          let newBeer = { ...doc.data(), id: doc.id };
          compiledBeers.push(newBeer);
        });

        setBeers(compiledBeers);
      })
      .catch((err) => {
        console.log("Error fetching All Beers", err);
        Toast.show({
          type: "error",
          text1: "Failed to fetch beer data",
          text2: err.message,
          position: "bottom",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [sortField, sortDirection]);

  return isLoading ? (
    <View>
      <Loading />
    </View>
  ) : (
    <SafeAreaView className="flex-1">
      <View className="flex-1">
        <Header />
        <ScrollView
          className="p-4"
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="bg-white rounded-lg p-2 mb-4">
            <Text className="font-semibold text-gray-700 mb-1">Sort by:</Text>
            <SortBy
              sortField={sortField}
              setSortField={setSortField}
              sortDirection={sortDirection}
              setSortDirection={setSortDirection}
            />
          </View>

          <View className="flex-row flex-wrap space-between">
            {beers.length === 0 ? (
              <Text>No Beers Found</Text>
            ) : (
              beers.map((beer, i) => (
                <BeerCard key={i} beer={beer} navigation={navigation} />
              ))
            )}
          </View>
        </ScrollView>
      </View>
      <Navbar />
    </SafeAreaView>
  );
}

export default BeerList;
