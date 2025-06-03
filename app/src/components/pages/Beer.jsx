import { Heart, Share2 } from "lucide-react-native";
import { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

// BLOCKERS
// not able to get dynamic info from database until it is populated

// TO DO BUT NEED TO WAIT
// 1 - need to update it so that the params from when the user clicks on a beer can be used to direct them to the correct individual beer screen
// 2 - dynamically get the required information from the database

// TO DO AND CAN BE DONE TODAY
// 1 - on press of the brewery, re direct the user to the brewery page
// 2 - have something actually happen when you click on share
// 3 - sort out reviews, also add a post review button which redirects user to post a review page
// 4 - maybe have country be an on press touchable opacity that re directs the user to a page that has beers filtered by their country
// 5 - have type take the user to a list of beers filtered by that type
// 6 - have the rating take the user to a list of beers filtered by rating
// 7 - separate everything out in to components

function Beer() {
  // use state
  const [liked, setLiked] = useState(false);

  // upon handle press being invoked, set liked to the opposite of its current state
  function handlePress() {
    setLiked(!liked);
  }

  // placeholder data, to be replaced once databases have all required info
  const name = "Awesome Brew";
  const image =
    "https://imgs.search.brave.com/HTnfzB4GPTeNE42Sm6aAH116T7QcNedDW2gE4mTiaks/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvNTQ1/ODY0NTU5L3Bob3Rv/L3VzYS1uZXctamVy/c2V5LWhhbmQtcG91/cmluZy1iZWVyLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz1F/Y0R2MXRqbjM1eEJt/amtUR0dkMmRTYk9P/eWZ1U0dTSWhlNUtM/bE5xSjFVPQ";
  const type = "IPA";
  const country = "Germany";
  const rating = 4.5;
  const brewery = "Berlin Brewery";
  const reviews = {
    rating: 4,
    datePosted: "03 June 2025",
    body: "I like this beer because beer is nice and beer beer beer",
    pairsWith: "Peanuts",
  };

  return (
    <ScrollView className="p-4 bg-gray-100 min-h-screen">
      {/* HEADER */}
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-xl font-bold">{name}</Text>
        <TouchableOpacity onPress={handlePress}>
          <Heart
            size={28}
            color={liked ? "red" : "gray"}
            fill={liked ? "red" : "none"}
          />
        </TouchableOpacity>
      </View>

      {/* IMAGE - have it fit better*/}
      <View className="w-full h-48 bg-gray-200 rounded-xl justify-center items-center mb-4">
        <Image
          source={{
            uri: image,
          }}
          className="w-full h-full"
          resizeMode="contain"
        />
      </View>

      {/* FLEX BOX HOLDING TYPE AND COUNTRY */}
      <View className="flex-row justify-between mb-2 space-x-2">
        {/* TYPE */}
        <View className="flex-1 bg-white border border-gray-300 rounded-lg p-2 items-center">
          <Text className="text-xl font-bold">{type}</Text>
        </View>
        {/* COUNTRY */}
        <View className="flex-1 bg-white border border-gray-300 rounded-lg p-2 items-center">
          <Text className="text-xl font-bold">{country}</Text>
        </View>
      </View>

      {/* FLEX BOX HOLDING RATING AND BREWERY */}
      <View className="flex-row justify-between mb-4 space-x-2">
        {/* RATING */}
        <View className="flex-1 bg-white border border-gray-300 rounded-lg p-2 items-center">
          <Text className="text-xl font-bold">{rating}</Text>
        </View>
        {/* BREWERY */}
        <View className="flex-1 bg-white border border-gray-300 rounded-lg p-2 items-center">
          <Text className="text-xl font-bold">{brewery}</Text>
        </View>
      </View>

      {/* REVIEWS */}
      <View className="bg-white border border-gray-300 rounded-xl p-4 mb-4">
        <Text className="text-center text-gray-500">
          Reviews - to be completed
        </Text>
      </View>

      {/* SHARE */}
      <View className="items-end">
        <TouchableOpacity className="flex-row items-center border border-gray-300 rounded-lg px-4 py-2">
          <Share2 size={20} color="gray" />
          <Text className="ml-2 text-gray-700">Share</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default Beer;
