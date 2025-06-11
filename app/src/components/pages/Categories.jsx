import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { collection, getDocs } from "firebase/firestore";
import { FIRESTORE_DB } from "../../../../firebaseconfig";
import Navbar from "./NavBar";
import HeaderNav from "./HeaderNav";
import { FilterDropdown } from "../CategoriesComponents/FilterDropdown";
import SearchBarWithSuggestions from "../CategoriesComponents/SearchBarWithSuggestions"; // 👈 New import

export default function Categories() {
  const [allBeers, setAllBeers] = useState([]);
  const [filteredBeers, setFilteredBeers] = useState([]);
  const [countries, setCountries] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchBeers = async () => {
      try {
        const snapshot = await getDocs(collection(FIRESTORE_DB, "beers"));
        const beers = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAllBeers(beers);

        const uniqueCountries = [
          ...new Set(beers.map((b) => b.country).filter(Boolean)),
        ];
        setCountries([...uniqueCountries]);

        const uniqueCategories = [
          ...new Set(beers.map((b) => b.category).filter(Boolean)),
        ];
        setCategories([...uniqueCategories]);
      } catch (err) {
        console.error("Error fetching beers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBeers();
  }, []);

  useEffect(() => {
    let filtered = allBeers;

    if (selectedCountry && selectedCountry !== "All") {
      filtered = filtered.filter((beer) => beer.country === selectedCountry);
    }

    if (selectedCategory && selectedCategory !== "All") {
      filtered = filtered.filter((beer) => beer.category === selectedCategory);
    }

    setFilteredBeers(filtered);
  }, [selectedCountry, selectedCategory, allBeers]);

  const renderBeer = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("Beer", { beerID: item.id })}
      className="p-4 border-b border-gray-200"
    >
      <Text className="text-lg font-bold">{item.name}</Text>
      <Text className="text-gray-600">
        {item.category} - {item.country}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-white"
    >
      <HeaderNav />

      <View className="flex-1 px-4 py-2">
       
        <SearchBarWithSuggestions data={allBeers} />

        <Text className="text-xl font-semibold mb-4">Filter Beers</Text>

        <FilterDropdown
          label="Country"
          items={countries}
          selectedValue={selectedCountry}
          onSelect={setSelectedCountry}
        />

        <FilterDropdown
          label="Category"
          items={categories}
          selectedValue={selectedCategory}
          onSelect={setSelectedCategory}
        />
        
        {loading ? (
          <ActivityIndicator size="large" className="mt-20" />
        ) : (
          <FlatList
            data={filteredBeers}
            keyExtractor={(item) => item.id}
            renderItem={renderBeer}
            contentContainerStyle={{ paddingBottom: 100 }}
            ListEmptyComponent={
              selectedCountry || selectedCategory ? (
                <Text>No beers match these filters.</Text>
              ) : (
                <Text>Select filters to see beers.</Text>
              )
            }
          />
        )}
      </View>

      <Navbar />
    </View>
  );
}
