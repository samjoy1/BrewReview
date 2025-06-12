// FIREBASE
import { FIRESTORE_DB } from "@/firebaseconfig";
import { arrayRemove, arrayUnion, collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";

// IMPORTS
import { useContext, useEffect, useState } from "react";
import { ImageBackground, ScrollView, Share, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import * as Linking from "expo-linking";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { UserContext } from "../../../index";

// COMPONENTS
import Header from "./HeaderNav";
import Navbar from "./NavBar";
import { BeerImage, BeerReviews, IndividualBeerHeader, InfoButtons, ShareButton } from "../beer/Index";


function Beer({ navigation }) {
  // HOOKS
  const [liked, setLiked] = useState(false);
  const [hasVotedOnReviewID, setHasVotedOnReviewID] = useState([]);
  const [beerData, setBeerData] = useState(null);
  const [reviews, setReviews] = useState([]);

  const route = useRoute();
  const { beerID } = route.params || {};

  const { loggedInUser, background, navbarColour } = useContext(UserContext);

  const userRef = loggedInUser ? doc(FIRESTORE_DB, "users", loggedInUser.id) : null;

  // ADDING TO FAVOURITES DATA
  useEffect(() => {
    getDoc(userRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          const favs = docSnap.data().favourite_beers || [];
          setLiked(favs.includes(beerID));
        }
      })
      .catch((err) => {
        console.log("Error reading favourites", err);
      });
  }, [beerID, loggedInUser, userRef]);

  // FETCHING THE BEER DATA
  useEffect(() => {
    const currentBeerID = beerID;

    if (!currentBeerID) return;

    const docRef = doc(FIRESTORE_DB, "beers", currentBeerID);

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
  }, [beerID]);

  // FETCHING REVIEW DATA AND INITIALISING hasVotedOnReviewID
  useEffect(() => {
    const currentBeerID = beerID;
    if (!currentBeerID) return;

    const reviewsRef = collection(FIRESTORE_DB, "reviews");
    const q = query(reviewsRef, where("beer_id", "==", currentBeerID));

    getDocs(q)
      .then((querySnapshot) => {
        const reviewsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          votes: doc.data().votes || [],
          ...doc.data(),
        }));
        setReviews(reviewsData);

        // Initialize hasVotedOnReviewID for the current logged-in user
        // This block should be INSIDE the .then() to access reviewsData
        if (loggedInUser) {
          const votedReviewIds = reviewsData
            .filter((review) => review.votes.includes(loggedInUser))
            .map((review) => review.id);
          setHasVotedOnReviewID(votedReviewIds);
        } else {
          setHasVotedOnReviewID([]); // Clear if no user logged in
        }
      }) // <--- This closing parenthesis is now in the correct place
      .catch((err) => {
        console.log("Error fetching reviews:", err);
        Toast.show({
          type: "error",
          text1: "Failed to fetch reviews",
          text2: err.message,
          position: "bottom",
        });
      });
  }, [beerID, loggedInUser]);

  // USING THE BEER DATA
  const name = beerData?.name || "Loading";
  const image = beerData?.img_url;
  const type = beerData?.category;
  const country = beerData?.country;
  const rating = beerData?.percentage;
  const brewery = beerData?.brewery;

  // HANDLER FUNCTIONS
  function handlePressBrewery() {
    navigation.navigate("Brewery", { breweryID: beerData?.brewery });
  }

  function handlePressHeartButton() {
    if (!loggedInUser) {
      Toast.show({
        type: "error",
        text1: "Please log in to add to favourites",
        position: "bottom",
      });
      return;
    }

    const action = liked ? arrayRemove(beerID) : arrayUnion(beerID);

    setDoc(
      userRef,
      {
        favourite_beers: action,
        ...(liked ? {} : { created_at: new Date() }),
      },
      { merge: true }
    )
      .then(() => {
        setLiked(!liked);
        Toast.show({
          type: "success",
          text1: liked ? "Removed from favourites" : "Added to favourites",
        });
      })
      .catch((err) => {
        console.error("Failed to toggle favourite:", err);
        Toast.show({
          type: "error",
          text1: "Failed to update favourites",
          text2: err.message,
        });
      });
  }

  function handlePressCountry() {
    navigation.navigate("Categories", { filterCountry: country });
  }

  function handlePressType() {
    navigation.navigate("Categories", { filterCategory: type });
  }

  // should go to all beers filtered by high to low rating
  function handlePressRating() {
    navigation.navigate("Categories", { sortByRating: true });
  }

  function handlePressPostReview() {
    navigation.navigate("PostReview", { beerID: beerID });
  }

  function handleVote(reviewId) {
    // 1. Check if user is logged in
    if (!loggedInUser) {
      Toast.show({
        type: "error",
        text1: "Please log in to vote on reviews",
        position: "bottom",
      });
      return;
    }

    // 2. Check if user has already voted on this specific review
    if (hasVotedOnReviewID.includes(reviewId)) {
      Toast.show({
        type: "info",
        text1: "You have already voted on this review",
        position: "bottom",
      });
      return;
    }

    // Prepare for Firestore update
    const reviewDocRef = doc(FIRESTORE_DB, "reviews", reviewId);

    // Update Firestore: Add the loggedInUser's ID to the 'votes' array
    updateDoc(reviewDocRef, {
      votes: arrayUnion(loggedInUser),
    })
      .then(() => {
        // Update local state:
        // Add reviewId to hasVotedOnReviewID so user can't vote again this session
        setHasVotedOnReviewID((prevReviews) => [...prevReviews, reviewId]);

        // Optimistically update the reviews state to reflect the new vote count
        setReviews((prevReviews) =>
          prevReviews.map((review) =>
            review.id === reviewId
              ? { ...review, votes: [...review.votes, loggedInUser] } // Add user ID to local votes array
              : review
          )
        );

        Toast.show({
          type: "success",
          text1: "Vote added",
          position: "bottom",
        });
      })
      .catch((err) => {
        console.error("Error casting vote:", err);
        Toast.show({
          type: "error",
          text1: "Failed to add vote",
          text2: err.message,
          position: "bottom",
        });
      });
  }

  function handleShare() {
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
    <SafeAreaView className="flex-1">
      <ImageBackground source={
        background==="black" ? require("../../../../assets/images/BR-bg-black.png") : 
        background==="white" ? require("../../../../assets/images/BR-bg-white.png") : 
        background==="green" ? require("../../../../assets/images/BR-bg-green.png") : 
        background==="yellow" ? require("../../../../assets/images/BR-bg-yellow.png") :
        background==="blue" ? require("../../../../assets/images/BR-bg-blue.png") :
        background==="brown" ? require("../../../../assets/images/BR-bg-brown.png") :
        require("../../../../assets/images/BR-bg-black.png")
      } className="relative flex-1 bg-scroll h-full">

        <Header colour={navbarColour}/>
        <ScrollView
          className="p-8"
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          <IndividualBeerHeader
            name={name}
            liked={liked}
            onHeartButtonPress={handlePressHeartButton}
          />

          
          <View className="bg-white/80 rounded-xl p-4 shadow-lg mb-2 mt-2">
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
              hasVotedOnReviewID={hasVotedOnReviewID}
              loggedInUser={loggedInUser}
            />
          </View>
          <ShareButton onShareButtonPress={handleShare} />

        </ScrollView>
        <Navbar colour={navbarColour}/>
      </ImageBackground>
    </SafeAreaView>
  );
}

export default Beer;
