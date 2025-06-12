// FIREBASE
import { collection, getDocs } from "firebase/firestore";
import { FIRESTORE_DB } from "../../../../firebaseconfig";

// IMPORTS
import { useNavigation, useRoute } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { UserContext } from "../../../index";

// COMPONENTS
import { FilterDropdown } from "../categories/FilterDropdown";
import SearchBarWithSuggestions from "../categories/SearchBarWithSuggestions";
import HeaderNav from "./HeaderNav";
import Navbar from "./NavBar";

export default function Categories() {
  let { loggedInUser, background, navbarColour } = useContext(UserContext);

  const [allBeers, setAllBeers] = useState([]);
  const [filteredBeers, setFilteredBeers] = useState([]);
  const [countries, setCountries] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [breweriesForDropdown, setBreweriesForDropdown] = useState([]);
  const [selectedBreweryId, setSelectedBreweryId] = useState("All");
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

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
    <SafeAreaView className="flex-1">
      <ImageBackground
        source={
          background === "black"
            ? require("../../../../assets/images/BR-bg-black.png")
            : background === "white"
            ? require("../../../../assets/images/BR-bg-white.png")
            : background === "green"
            ? require("../../../../assets/images/BR-bg-green.png")
            : background === "yellow"
            ? require("../../../../assets/images/BR-bg-yellow.png")
            : background === "blue"
            ? require("../../../../assets/images/BR-bg-blue.png")
            : background === "brown"
            ? require("../../../../assets/images/BR-bg-brown.png")
            : require("../../../../assets/images/BR-bg-black.png")
        }
        className="relative flex-1"
      >
        <HeaderNav colour={navbarColour} />

        <KeyboardAvoidingView
          className="flex-1 p-4"
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View className="bg-white flex-1 p-4 rounded-xl shadow-lg">
            <SearchBarWithSuggestions data={allBeers} />

            {/* Toggle button for filters */}
            <TouchableOpacity
              onPress={() => setShowFilters(!showFilters)}
              className="bg-blue-500 rounded-lg p-2 mb-4 items-center" // Tailwind for a simple button
            >
              <Text className="text-white font-bold text-base">
                {showFilters ? "Hide Filters" : "Show Filters"}
              </Text>
            </TouchableOpacity>

            {/* Conditionally render the filter section */}
            {showFilters && (
              <View>
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
              </View>
            )}

            {loading ? (
              <ActivityIndicator size="large" className="mt-20" />
            ) : (
              <FlatList
                data={filteredBeers}
                keyExtractor={(item) => item.id}
                renderItem={renderBeer}
                contentContainerStyle={{ paddingBottom: 60 }}
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
        <Navbar colour={navbarColour} />
      </ImageBackground>
    </SafeAreaView>
  );
}
