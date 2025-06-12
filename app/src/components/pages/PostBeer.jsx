// IMPORTS
import { useContext, useEffect, useState } from "react";
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

import { UserContext } from "../../../index.jsx";

// SCRIPTS
import { postBeer } from "../../../scripts/post";

// COMPONENTS
import HeaverNav from "../pages/HeaderNav";
import NavBar from "../pages/NavBar";
import BeerForm from "../postBeer/BeerForm.jsx";

// STYLING
let review_rating_button_selected = "bg-sky-500 w-40 p-3";
let review_rating_button_unselected = "bg-white w-40 p-3";

function PostBeer({ navigation }) {
  // STATES
  const { loggedInUser, background, navbarColour } = useContext(UserContext);

  const [beer, setBeer] = useState({
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
  });

  // VALIDATION
  function isBeerValid(newBeer) {
    if (!newBeer.name) {
      Toast.show({
        type: "error",
        text1: "Please enter a name for your beer",
      });
      return false;
    }
    if (!newBeer.country) {
      Toast.show({
        type: "error",
        text1: "Please enter the country your beer is from",
      });
      return false;
    }
    if (!newBeer.category) {
      Toast.show({
        type: "error",
        text1: "Please select a category",
      });
      return false;
    }
    return true;
  }

  // SUBMIT
  function submitBeer(newBeer) {
    setBeer(newBeer);
    if (isBeerValid(newBeer)) {
      postBeer(newBeer);
      Toast.show({
        type: "success",
        text1: "You just created a new Beer! Why not give it a rating?",
      });
    }
    // should reload the page
  }

  useEffect(() => {}, []);

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
        <HeaverNav colour={navbarColour} />
        <ScrollView className="relative flex-1">
          <View className="flex-row justify-center mt-4">
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("PostReview");
              }}
              className={review_rating_button_unselected + " rounded-l-xl"}
            >
              <Text className="font-bold text-center text-black">Review</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {}}
              className={review_rating_button_selected + " rounded-r-xl"}
            >
              <Text className="font-bold text-center text-white">Beer</Text>
            </TouchableOpacity>
          </View>

          <View className="p-6">
            <Text className="bg-zinc-800/90 rounded-xl color-white font-bold text-2xl mb-2 p-3">
              {" "}
              Beer doesn't exist yet? Create one!
            </Text>
            <BeerForm submitBeer={submitBeer} />
          </View>
        </ScrollView>
      </ImageBackground>
      <NavBar colour={navbarColour} />
    </SafeAreaView>
  );
}

export default PostBeer;
