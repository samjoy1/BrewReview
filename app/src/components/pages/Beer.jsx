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

// TO DO BUT NEED TO WAIT
// - dynamically get the required information from the database
// - use params to take user to correct brewery page

// TO TELL TEAM ABOUT
// - toast being a global thing we can use

// 7 - separate everything out in to components, handler funcs etc

function Beer() {
  // HOOKS
  const [liked, setLiked] = useState(false);
  const [hasVotedOnReviewID, setHasVotedOnReviewID] = useState([]);
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

  // should go to all beers filtered by country
  function handlePressCountry() {
    navigation.navigate("Search");
  }

  // should go to all beers filtered by type
  function handlePressType() {
    navigation.navigate("Search");
  }

  // should go to all beers filtered by high to low rating
  function handlePressRating() {
    navigation.navigate("Search");
  }

  function handlePressPostReview() {
    navigation.navigate("PostReview");
  }

  function handleVote(reviewId) {
    if (hasVotedOnReviewID.includes(reviewId)) {
      Toast.show({
        type: "info",
        text1: "You have already voted on this review",
        position: "bottom",
      });
      return;
    }

    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review.id === reviewId ? { ...review, votes: review.votes + 1 } : review
      )
    );

    setHasVotedOnReviewID((prevReviews) => [...prevReviews, reviewId]);
    Toast.show({
      type: "success",
      text1: "Vote added",
      position: "bottom",
    });
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
        className="p-4"
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
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
        <View className="flex-row mb-2 px-1">
          {/* TYPE */}
          <TouchableOpacity
            className="w-1/2 h-14 bg-white border border-gray-300 rounded-lg justify-center items-center"
            onPress={handlePressType}
          >
            <Text className="text-base font-bold text-center">{type}</Text>
          </TouchableOpacity>
          {/* COUNTRY */}
          <TouchableOpacity
            className="w-1/2 h-14 bg-white border border-gray-300 rounded-lg justify-center items-center"
            onPress={handlePressCountry}
          >
            <Text className="text-base font-bold text-center">{country}</Text>
          </TouchableOpacity>
        </View>

        {/* FLEX BOX HOLDING RATING AND BREWERY */}
        <View className="flex-row mb-4 px-1">
          {/* RATING */}

          <TouchableOpacity
            className="w-1/2 h-14 bg-white border border-gray-300 rounded-lg justify-center items-center"
            onPress={handlePressRating}
          >
            <Text className="text-base font-bold text-center">{rating}</Text>
          </TouchableOpacity>
          {/* BREWERY */}
          <TouchableOpacity
            className="w-1/2 h-14 bg-white border border-gray-300 rounded-lg justify-center items-center"
            onPress={handlePressBrewery}
          >
            <Text className="text-base font-bold text-center">{brewery}</Text>
          </TouchableOpacity>
        </View>

        {/* REVIEWS - insert beer icon rating system*/}
        <View className="bg-white border border-gray-300 rounded-xl p-4 mb-4">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold mb-2">Reviews</Text>

            <TouchableOpacity
              onPress={handlePressPostReview}
              className="bg-green-500 px-3 py-1 rounded"
            >
              <Text className="text-black text-sm font-semibold">Post Review</Text>
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
