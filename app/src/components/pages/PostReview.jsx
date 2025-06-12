// IMPORTS
import { useContext, useState } from "react";
import { ImageBackground, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Toast from 'react-native-toast-message';

import { UserContext } from "../../../index.jsx";

// SCRIPTS
import { postReview } from "../../../scripts/post";

// COMPONENTS
import HeaderNav from "../pages/HeaderNav.jsx";
import Navbar from "../pages/NavBar.jsx";
import { ReviewForm, ReviewRating, SelectBeer } from "../postReview/index.jsx";

// STYLING
let review_rating_button_selected = "font-bold text-center bg-sky-500 w-40 p-3"
let review_rating_button_unselected = "font-bold text-center bg-white w-40 p-3"

function PostReview ({ navigation }) {
    // STATES
    const { loggedInUser, background, navbarColour } = useContext(UserContext)

    const [posting_beer, setPosting_beer] = useState({
        id: "",
        name: "",
        country: "",
        category: "",
        brewery: "",
        logo_url: "",
        img_url: "",
        percentage: 0,
        tags: [],
        reviews: [],
    })
    const [type, setType] = useState("review")

    const [review, setReview] = useState({
        id: "",
        name: "",
        country: "",
        category: "",
        brewery: "",
        logo_url: "",
        img_url: "",
        percentage: 0,
        tags: [],
        reviews: [],
    })

    // VALIDATION
    function isReviewValid (newReview) {
        if (newReview.type==="rating") {
            if (newReview.rating!==0) {
                return true
            }
        }
        if (!newReview.beer_id) {
            Toast.show({
                type: "error",
                text1: "Please select a beer to review",
                position: "bottom"
            })
        }
        if (!newReview.title) {
            Toast.show({
                type: "error",
                text1: "Please enter a title for your review",
                position: "bottom"
            })
            return false
        }
        if (!newReview.body) {
            Toast.show({
                type: "error",
                text1: "Please enter a review",
                position: "bottom"
            })
            return false
        } return true
    }

    // SUBMIT
    function submitReview (newReview) {
        setReview(newReview)
        if (isReviewValid(newReview)) {
            postReview(newReview)
            if (newReview.type==="review") {
                Toast.show({
                    type: "success",
                    text1: "You just posted a review!"
                })
            } else if (newReview.type==="rating") {
                Toast.show({
                    type: "success",
                    text1: "You just rated this beer!"
                })
            }
        }
        // should reload the page

    }
    if (!newReview.body) {
      Toast.show({
        type: "error",
        text1: "Please enter a review",
      });
      return false;
    }
    return true;
  }

  // SUBMIT
  function submitReview(newReview) {
    setReview(newReview);
    if (isReviewValid(newReview)) {
      postReview(newReview);
      Toast.show({
        type: "success",
        text1: "You just posted a review!",
      });
    }
    // should reload the page
  }

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
        <ScrollView className="relative flex-1">
          <View className="flex-row justify-center mt-4">
            <TouchableOpacity
              onPress={() => {}}
              className={review_rating_button_selected + " rounded-l-xl"}
            >
                <HeaderNav colour={navbarColour}/>
                <ScrollView className="relative flex-1">

                <View className="flex-row justify-center mt-4">
                    <TouchableOpacity onPress={() => {}}
                        className={review_rating_button_selected+" rounded-l-xl"}>
                        <Text className="text-center font-bold">Review</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { navigation.navigate("PostBeer")}}
                        className={review_rating_button_unselected+" rounded-r-xl"}>
                        <Text className="text-center font-bold">Beer</Text>
                    </TouchableOpacity>
                </View>

                <View className="p-6 justify-center">
                    { type==="review" ? 
                    <Text className="bg-violet-900 rounded-xl color-white font-bold h-full text-2xl mb-2 mr-32 p-3"> Like a Beer? Post a Review!</Text>
                    :
                    <Text className="bg-violet-900 rounded-xl color-white font-bold h-full text-2xl mb-2 mr-32 p-3"> Like a Beer? Leave a Rating!</Text>
                    }
                    <View className="flex-row justify-center">
                        <TouchableOpacity onPress={() => { setType("review") }}
                            className={ type==="review" ? review_rating_button_selected+" rounded-l-xl" : review_rating_button_unselected+" rounded-l-xl"}>
                            <Text className="text-center font-bold">Review</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { setType("rating")}}
                            className={ type==="rating" ? review_rating_button_selected+" rounded-r-xl" : review_rating_button_unselected+" rounded-r-xl"}>
                            <Text className="text-center font-bold">Rating</Text>
                        </TouchableOpacity>
                    </View>
                    <SelectBeer setPosting_beer={setPosting_beer}/>
                    { type === "review" ? 
                    <ReviewForm posting_user_id={loggedInUser.id} posting_beer={posting_beer} submitReview={submitReview}/>
                    : <ReviewRating posting_beer={posting_beer} posting_user_id={loggedInUser.id} submitReview={submitReview}/>
                    }
                    
                </View>
                </ScrollView>
                <Navbar colour={navbarColour}/>
            </ImageBackground>
        </SafeAreaView>
    )
}

export default PostReview;
