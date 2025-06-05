import { useNavigation } from "@react-navigation/native";
import * as Linking from "expo-linking";
import { useState } from "react";
import { ScrollView, Share } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import {
  BeerImage,
  BeerReviews,
  Header,
  InfoButtons,
  ShareButton,
} from "../beer/Index";

// TO DO BUT NEED TO WAIT
// - dynamically get the required information from the database
// - use params to take user to correct brewery page

// TO TELL TEAM ABOUT
// - toast being a global thing we can use

function Beer() {
  // placeholder data, to be replaced once databases have all required info
  const name = "Tasty Bev";
  const image =
    "https://imgs.search.brave.com/HTnfzB4GPTeNE42Sm6aAH116T7QcNedDW2gE4mTiaks/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvNTQ1/ODY0NTU5L3Bob3Rv/L3VzYS1uZXctamVy/c2V5LWhhbmQtcG91/cmluZy1iZWVyLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz1F/Y0R2MXRqbjM1eEJt/amtUR0dkMmRTYk9P/eWZ1U0dTSWhlNUtM/bE5xSjFVPQ";
  const type = "IPA";
  const country = "Germany";
  const rating = 4.5;
  const brewery = "Berlin Brewery";

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
  function handlePressBrewery() {
    navigation.navigate("Brewery");
  }

  function handlePressHeartButton() {
    setLiked(!liked);
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

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView
        className="p-4"
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <Header
          name={name}
          liked={liked}
          onHeartButtonPress={handlePressHeartButton}
        />

        <BeerImage image={image} />

        <InfoButtons
          type={type}
          country={country}
          rating={rating}
          brewery={brewery}
          onTypeButtonPress={handlePressType}
          onCountryButtonPress={handlePressCountry}
          onRatingButtonPress={handlePressRating}
          onBreweryButtonPress={handlePressBrewery}
        />

        <BeerReviews
          reviews={reviews}
          onPostReviewButtonPress={handlePressPostReview}
          onVoteButtonPress={handleVote}
        />

        <ShareButton onShareButtonPress={handleShare} />
      </ScrollView>
    </SafeAreaView>
  );
}

export default Beer;
