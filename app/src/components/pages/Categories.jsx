import { useNavigation, useRoute } from "@react-navigation/native";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FIRESTORE_DB } from "../../../../firebaseconfig";
import { FilterDropdown } from "../CategoriesComponents/FilterDropdown";
import SearchBarWithSuggestions from "../CategoriesComponents/SearchBarWithSuggestions"; // 👈 New import
import HeaderNav from "./HeaderNav";
import Navbar from "./NavBar";

export default function Categories() {
  const [allBeers, setAllBeers] = useState([]);
  const [filteredBeers, setFilteredBeers] = useState([]);
  const [countries, setCountries] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();
  const route = useRoute();

  const { filterCountry, filterCategory, sortByRating } = route.params || {};

  useEffect(() => {
    if (filterCountry && countries.includes(filterCountry)) {
      setSelectedCountry(filterCountry);
    } else {
      setSelectedCountry("All");
    }
    if (filterCategory && categories.includes(filterCategory)) {
      setSelectedCategory(filterCategory);
    } else {
      setSelectedCategory("All");
    }
  }, [filterCountry, filterCategory, countries, categories]);

  useEffect(() => {
    const fetchBeers = async () => {
      try {
        const beersRef = collection(FIRESTORE_DB, "beers");
        const snapshot = await getDocs(beersRef);
        const beers = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAllBeers(beers);

        const uniqueCountries = [
          "All",
          ...new Set(beers.map((b) => b.country).filter(Boolean)),
        ].sort();
        setCountries([...uniqueCountries]);

        const uniqueCategories = [
          "All",
          ...new Set(beers.map((b) => b.category).filter(Boolean)),
        ].sort();
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
    let currentFiltered = [...allBeers];

    if (selectedCountry && selectedCountry !== "All") {
      currentFiltered = currentFiltered.filter(
        (beer) => beer.country === selectedCountry
      );
    }

    if (selectedCategory && selectedCategory !== "All") {
      currentFiltered = currentFiltered.filter(
        (beer) => beer.category === selectedCategory
      );
    }

    if (sortByRating) {
      currentFiltered.sort((a, b) => (b.percentage || 0) - (a.percentage || 0));
    }

    setFilteredBeers(currentFiltered);
  }, [selectedCountry, selectedCategory, sortByRating, allBeers]);

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
    <View className="flex-1 bg-white">
      <HeaderNav />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
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
                selectedCountry !== "All" ||
                selectedCategory !== "All" ||
                sortByRating ? (
                  <Text style={{ textAlign: "center", marginTop: 20 }}>
                    No beers match these filters/sort.
                  </Text>
                ) : (
                  <Text style={{ textAlign: "center", marginTop: 20 }}>
                    No beers available.
                  </Text>
                )
              }
            />
          )}
        </View>
      </KeyboardAvoidingView>
      <Navbar />
    </View>
  );
}
