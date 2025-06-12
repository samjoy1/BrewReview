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
import SearchBarWithSuggestions from "../CategoriesComponents/SearchBarWithSuggestions";
import HeaderNav from "./HeaderNav";
import Navbar from "./NavBar";

export default function Categories() {
  const [allBeers, setAllBeers] = useState([]);
  const [filteredBeers, setFilteredBeers] = useState([]);
  const [countries, setCountries] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [breweriesForDropdown, setBreweriesForDropdown] = useState([]);
  const [selectedBreweryId, setSelectedBreweryId] = useState("All");
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();
  const route = useRoute();

  const { filterCountry, filterCategory, sortByRating, filterBreweryId } =
    route.params || {};

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
    if (
      filterBreweryId &&
      breweriesForDropdown.some((b) => b.id === filterBreweryId)
    ) {
      setSelectedBreweryId(filterBreweryId);
    } else {
      setSelectedBreweryId("All");
    }
  }, [
    filterCountry,
    filterCategory,
    filterBreweryId,
    countries,
    categories,
    breweriesForDropdown,
  ]);

  useEffect(() => {
    const fetchBeersAndDropdowns = async () => {
      try {
        setLoading(true);
        const beersRef = collection(FIRESTORE_DB, "beers");
        const beersSnapshot = await getDocs(beersRef);
        const fetchedBeers = beersSnapshot.docs.map((doc) => ({
          id: doc.id,
          brewery_id: doc.data().brewery,
          ...doc.data(),
        }));
        setAllBeers(fetchedBeers);

        const breweriesRef = collection(FIRESTORE_DB, "breweries");
        const breweriesSnapshot = await getDocs(breweriesRef);
        const fetchedBreweries = breweriesSnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
        }));

        const uniqueCountries = [
          "All",
          ...new Set(fetchedBeers.map((b) => b.country).filter(Boolean)),
        ].sort();
        setCountries([...uniqueCountries]);

        const uniqueCategories = [
          "All",
          ...new Set(fetchedBeers.map((b) => b.category).filter(Boolean)),
        ].sort();
        setCategories([...uniqueCategories]);

        const breweryDropdownItems = [
          { id: "All", name: "All" },
          ...fetchedBreweries.sort((a, b) => a.name.localeCompare(b.name)),
        ];
        setBreweriesForDropdown(breweryDropdownItems);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBeersAndDropdowns();
  }, []);

  useEffect(() => {
    let currentFiltered = [...allBeers];

    if (selectedCountry !== "All") {
      currentFiltered = currentFiltered.filter(
        (beer) => beer.country === selectedCountry
      );
    }

    if (selectedCategory !== "All") {
      currentFiltered = currentFiltered.filter(
        (beer) => beer.category === selectedCategory
      );
    }

    if (selectedBreweryId !== "All") {
      currentFiltered = currentFiltered.filter(
        (beer) => beer.brewery_id === selectedBreweryId
      );
    }

    if (sortByRating) {
      currentFiltered.sort((a, b) => (b.percentage || 0) - (a.percentage || 0));
    }

    setFilteredBeers(currentFiltered);
  }, [
    selectedCountry,
    selectedCategory,
    selectedBreweryId,
    sortByRating,
    allBeers,
  ]);

  const renderBeer = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("Beer", { beerID: item.id })}
      className="p-4 border-b border-gray-200"
    >
      <Text className="text-lg font-bold">{item.name}</Text>
      <Text className="text-gray-600">
        {item.category} - {item.country}
      </Text>
      {item.percentage && (
        <Text className="text-gray-600">Rating: {item.percentage}%</Text>
      )}
      {item.brewery_name && (
        <Text className="text-gray-600">Brewery: {item.brewery_name}</Text>
      )}
    </TouchableOpacity>
  );

  const getSelectedBreweryDisplayName = () => {
    if (selectedBreweryId === "All") {
      return "All";
    }
    const brewery = breweriesForDropdown.find(
      (b) => b.id === selectedBreweryId
    );
    return brewery ? brewery.name : "All";
  };

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

          <FilterDropdown
            label="Brewery"
            items={breweriesForDropdown.map((b) => b.name)}
            selectedValue={getSelectedBreweryDisplayName()}
            onSelect={(selectedName) => {
              const brewery = breweriesForDropdown.find(
                (b) => b.name === selectedName
              );
              setSelectedBreweryId(brewery ? brewery.id : "All");
            }}
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
                selectedBreweryId !== "All" ||
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
