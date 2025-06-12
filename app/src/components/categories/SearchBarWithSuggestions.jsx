import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function SearchBarWithSuggestions({ data }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    const matches = data.filter((beer) =>
      beer.name.toLowerCase().includes(query.toLowerCase())
    );

    setSuggestions(matches.slice(0, 5)); // Limit to 5 suggestions
  }, [query, data]);

  const handleSelect = (beer) => {
    setQuery("");
    setSuggestions([]);
    navigation.navigate("Beer", { beerID: beer.id });
  };

  return (
    <View className="mb-2 z-10">
      <TextInput
        className="border border-gray-300 rounded px-3 py-2"
        placeholder="Search for a beer..."
        value={query}
        onChangeText={setQuery}
      />
      {suggestions.length > 0 && (
        <View className="bg-white border border-gray-200 rounded mt-1 shadow z-50">
          {suggestions.map((beer) => (
            <TouchableOpacity
              key={beer.id}
              onPress={() => handleSelect(beer)}
              className="p-2 border-b border-gray-100"
            >
              <Text className="font-medium">{beer.name}</Text>
              <Text className="text-xs text-gray-500">
                {beer.category} - {beer.country}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}
