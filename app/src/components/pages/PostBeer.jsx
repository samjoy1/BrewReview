// IMPORTS
import { useContext, useEffect, useState } from "react";
import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Text,
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

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

function PostBeer() {
  // STATES
  const { loggedInUser } = useContext(UserContext);

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
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      className="relative flex-1"
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ImageBackground
          source={require("../../../../assets/images/BR-bg.png")}
          style={{ flex: 1, width: "100%", height: "100%" }}
          className="relative flex-shrink p-2"
          resizeMode="cover"
        >
          <HeaverNav />
          <View className="p-6" style={{ flex: 1 }}>
            <Text
              className="bg-zinc-800/90 rounded-xl color-white font-bold text-2xl mb-2 p-3"
              style={{
                width: screenWidth * 0.8,
                alignSelf: "center",
                textAlign: "center",
              }}
            >
              Beer doesn't exist yet? Create one!
            </Text>
            <BeerForm submitBeer={submitBeer} />
          </View>
        </ImageBackground>
      </SafeAreaView>
      <NavBar />
    </ScrollView>
  );
}

export default PostBeer;
