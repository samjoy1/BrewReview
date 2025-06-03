import { useNavigation } from "@react-navigation/native";
import * as Linking from "expo-linking";
import { Heart, Share2 } from "lucide-react-native";
import { useState } from "react";
import {
  Image,
  ScrollView,
  Share,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

// BLOCKERS
// not able to get dynamic info from database until it is populated

// TO DO BUT NEED TO WAIT
// - dynamically get the required information from the database
// - use params to take user to correct brewery page

// TO TELL TEAM ABOUT
// - toast being a global thing we can use

// TO DO AND CAN BE DONE SOON
// 3 - sort out reviews, also add a post review button which redirects user to post a review page
// 3 - prevent the user from
// 4 - maybe have country be an on press touchable opacity that re directs the user to a page that has beers filtered by their country
// 5 - have type take the user to a list of beers filtered by that type
// 6 - have the rating take the user to a list of beers filtered by rating
// 7 - separate everything out in to components, handler funcs etc

function Beer() {
  // HOOKS
  const [liked, setLiked] = useState(false);
  const [reviews, setReviews] = useState([
    {
      id: 1,
      rating: 4,
      date_created: "03 June 2025",
      body: "I like this beer because beer is nice and beer beer beer",
      title: "My review",
      user: "Example Beer User",
      votes: 9,
    },
  ]);
  const navigation = useNavigation();

  // HANDLER FUNCTIONS
  function handlePressHeartButton() {
    setLiked(!liked);
  }

  // need to use params to send the user to the correct brewery page when the database is live
  function handlePressBrewery() {
    navigation.navigate("Brewery");
  }

  function handlePressPostReview() {
    navigation.navigate("PostReview");
  }

  function handleVote(reviewId) {
    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review.id === reviewId ? { ...review, votes: review.votes + 1 } : review
      )
    );
  }

  // currently just sends a string of that thing but i also want to send a link to the individual beer so add that
  function handleShare() {
    // this will be changed later to be dynamic
    const beerID = "awesome-brew";
    // currently shares a development url, won't work without expo go
    const url = Linking.createURL(`/beer/${beerID}`);

    Share.share({
      message: `${name} from ${brewery} was so good I simply had to share it with you 🍻\n\n${url}`,
    })
      .then((result) => {
        if (result.action === Share.sharedAction) {
          console.log("beer shared successfully");
          Toast.show({
            type: "success",
            text1: "Shared successfully",
            position: "bottom",
          });
        }
      })
      .catch((err) => {
        console.log("There was an error sharing", err.message);
        Toast.show({
          type: "error",
          text1: "Failed to share",
          text2: err.message,
          position: "bottom",
        });
      });
  }

  // placeholder data, to be replaced once databases have all required info
  const name = "Awesome Brew";
  const image =
    "https://imgs.search.brave.com/HTnfzB4GPTeNE42Sm6aAH116T7QcNedDW2gE4mTiaks/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvNTQ1/ODY0NTU5L3Bob3Rv/L3VzYS1uZXctamVy/c2V5LWhhbmQtcG91/cmluZy1iZWVyLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz1F/Y0R2MXRqbjM1eEJt/amtUR0dkMmRTYk9P/eWZ1U0dTSWhlNUtM/bE5xSjFVPQ";
  const type = "IPA";
  const country = "Germany";
  const rating = 4.5;
  const brewery = "Berlin Brewery";

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView
        className="p-4 bg-gray-100 min-h-screen pb-32"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {/* HEADER */}
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-xl font-bold">{name}</Text>
          <TouchableOpacity onPress={handlePressHeartButton}>
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
          <View>
            <TouchableOpacity
              className="flex-1 bg-white border border-gray-300 rounded-lg p-2 items-center"
              onPress={handlePressBrewery}
            >
              <Text className="text-xl font-bold">{brewery}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* REVIEWS - insert beer icon rating system*/}
        <View className="bg-white border border-gray-300 rounded-xl p-4 mb-4">
          <Text className="text-xl font-bold mb-2">Reviews</Text>
          <View className="p-4">
            <TouchableOpacity
              onPress={handlePressPostReview}
              className="bg-green-500 px-3 py-1 rounded"
            >
              <Text className="text-black text-lg">Post Review</Text>
            </TouchableOpacity>
          </View>

          {reviews.map((review) => (
            <View
              key={review.id}
              className="border-b border-gray-200 mb-2 pb-2"
            >
              <Text className="font-semibold text-lg">{review.title}</Text>
              <Text className="text-gray-600 text-sm mb-1">
                By {review.user} on {review.date_created} --- Rating:{" "}
                {review.rating}
              </Text>
              <Text className="mb-2">{review.body}</Text>
              <View className="flex-row items-center justify-between">
                <Text>Votes: {review.votes}</Text>
                <TouchableOpacity
                  className="bg-blue-500 px-3 py-1 rounded"
                  onPress={() => handleVote(review.id)}
                >
                  <Text className="text-white">Vote +1</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* SHARE */}
        <View className="items-end">
          <TouchableOpacity
            className="flex-row items-center border border-gray-300 rounded-lg px-4 py-2"
            onPress={handleShare}
          >
            <Share2 size={20} color="gray" />
            <Text className="ml-2 text-gray-700">Share</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Beer;
