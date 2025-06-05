import { FIRESTORE_DB } from "@/firebaseconfig";
import { useNavigation } from "@react-navigation/native";
import * as Linking from "expo-linking";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { ScrollView, Share } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import {
  BeerImage,
  BeerReviews,
  IndividualBeerHeader,
  InfoButtons,
  ShareButton,
} from "../beer/Index";
import Header from "./HeaderNav";
import Navbar from "./NavBar";

// - use params to take user to correct brewery page

function Beer() {
  // HOOKS
  const [liked, setLiked] = useState(false);
  const [hasVotedOnReviewID, setHasVotedOnReviewID] = useState([]);
  const [beerData, setBeerData] = useState(null);
  const [reviews, setReviews] = useState([]);
  const navigation = useNavigation();

  // FETCHING THE BEER DATA
  useEffect(() => {
    const id = "313_craft"; // get this later from route.params once katys page has been approved and merged
    const docRef = doc(FIRESTORE_DB, "beers", id);

    getDoc(docRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          setBeerData(docSnap.data());
        } else {
          console.log("Unable to find more information on that Beer!");
          Toast.show({
            type: "error",
            text1: "Unable to display more information on this beer",
            position: "bottom",
          });
        }
      })
      .catch((err) => {
        console.log("Error fetching beer", err);
        Toast.show({
          type: "error",
          text1: "Failed to fetch beer data",
          text2: err.message,
          position: "bottom",
        });
      });
  }, []);

  // FETCHING REVIEW DATA
  useEffect(() => {
    const id = "313_craft"; // get this later from route.params...
    const reviewsRef = collection(FIRESTORE_DB, "reviews");
    const q = query(reviewsRef, where("beer_id", "==", id));

    getDocs(q)
      .then((querySnapshot) => {
        const reviewsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setReviews(reviewsData);
      })
      .catch((err) => {
        console.log("Error fetching reviews:", err);
        Toast.show({
          type: "error",
          text1: "Failed to fetch reviews",
          text2: err.message,
          position: "bottom",
        });
      });
  }, []);

  // USING THE BEER DATA
  const name = beerData?.name || "Loading";
  const image = beerData?.image;
  const type = beerData?.category;
  const country = beerData?.country;
  const rating = beerData?.percentage;
  const brewery = beerData?.brewery;

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
      <Header />
      <ScrollView
        className="p-4"
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <IndividualBeerHeader
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
      <Navbar />
    </SafeAreaView>
  );
}

export default Beer;
