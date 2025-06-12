
// FIREBASE
import { FIRESTORE_DB } from "@/firebaseconfig";
import { arrayRemove, arrayUnion, doc, getDoc, setDoc } from "firebase/firestore";

// IMPORTS
import { useRoute } from "@react-navigation/native";
import * as Linking from "expo-linking";
import { useContext, useEffect, useState } from "react";
import { ImageBackground, ScrollView, Share, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { getBreweryById } from "../../../scripts/fetch";

import { UserContext } from "../../../index";

// COMPONENTS
import { BreweryImage, BreweryInfoButtons, IndividualBreweryHeader, ShareButton } from "../brewery/Index";
import Header from "./HeaderNav";
import Navbar from "./NavBar";


function Brewery({ navigation }) {
  // HOOKS
  const [liked, setLiked] = useState(false);
  const [breweryData, setBreweryData] = useState(null);

  const route = useRoute();
  const { breweryID } = route.params || {};

  const { loggedInUser, background, navbarColour } = useContext(UserContext)

  const userRef = loggedInUser ? doc(FIRESTORE_DB, "users", loggedInUser.id) : null;

    useEffect(() => {
      if (!loggedInUser) {
        setLiked(false); 
        return;
      }
  
      getDoc(userRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            const favs = docSnap.data().favourite_breweries || [];
            setLiked(favs.includes(breweryID));
          } else {
            setLiked(false);
          }
        })
        .catch((err) => {
          console.log("Error reading favourite breweries", err);
          setLiked(false); 
        });
    }, [breweryID, loggedInUser]); 

  // FETCHING BREWERY DATA
  useEffect(() => {
    if (breweryID) {
      getBreweryById(breweryID)
        .then((data) => {
          setBreweryData(data);
        })
        .catch((err) => {
          console.log("Unable to find more information on that Brewery!", err);
          Toast.show({
            type: "error",
            text1: "Unable to display more information on this brewery",
            position: "bottom",
          });
        });
    }
  }, [breweryID]);

  // HANDLER FUNCTIONS
  async function handlePressHeartButton() {
    if (!loggedInUser) {
      Toast.show({
        type: "error",
        text1: "Please log in to add to favourites",
        position: "bottom",
      });
      return;
    }

    if (!userRef) {
      Toast.show({
        type: "error",
        text1: "User reference not available",
        position: "bottom",
      });
      return;
    }

    const action = liked ? arrayRemove(breweryID) : arrayUnion(breweryID);

    try {
      await setDoc(
        userRef,
        {
          favourite_breweries: action,
        },
        { merge: true } 
      );
      setLiked(!liked);
      Toast.show({
        type: "success",
        text1: liked
          ? "Removed from favourite breweries"
          : "Added to favourite breweries",
        position: "bottom",
      });
    } catch (err) {
      console.error("Failed to toggle favourite brewery:", err);
      Toast.show({
        type: "error",
        text1: "Failed to update favourites",
        text2: err.message,
        position: "bottom",
      });
    }
  }

  function handlePressCountry() {
    navigation.navigate("Categories", {filterCountry: country});
  }

  function handlePressUrl() {
    if (typeof url === "string" && url.startsWith("http")) {
      Linking.openURL(url).catch((err) => {
        console.log("Failed to open url", err);
        Toast.show({
          type: "error",
          text1: "Failed to open website.",
          text2:
            "Unfortunately we do not have a url for this brewery's website, try a search engine.",
          position: "bottom",
        });
      });
    } else {
      Toast.show({
        type: "error",
        text1: "Failed to open website.",
        text2: "Unfortunately we do not have a url for this brewery.",
        position: "bottom",
      });
    }
  }

  function handlePressBeers() {
    navigation.navigate("Categories", {filterBrewery: breweryID});
  }

  function handlePressCity() {
    navigation.navigate("Map");
  }

  function handleShare() {
    const shareUrl = Linking.createURL(`/brewery/${breweryID}`);

    Share.share({
      message: `${name} was so cool I simply had to share it with you 🍻\n\n${shareUrl}`,
    })
      .then((result) => {
        if (result.action === Share.sharedAction) {
          console.log("brewery shared successfully");
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

  // USING THE BREWERY DATA
  const name = breweryData?.name || "Loading";
  const image = breweryData?.img_url;
  const country = breweryData?.country;
  const city = breweryData?.location;
  const url = breweryData?.url;
  const foundedDate = breweryData?.founded_date;

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
      } className="relative flex-shrink">

        <Header colour={navbarColour}/>
        <ScrollView
          className="p-8"
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          <IndividualBreweryHeader
            name={name}
            liked={liked}
            foundedDate={foundedDate}
            onHeartButtonPress={handlePressHeartButton}
          />
          <View className="bg-white/80 rounded-xl p-4 mb-2 shadow-lg">
            <BreweryImage image={image} />

            <BreweryInfoButtons
              country={country}
              city={city}
              url={url}
              foundedDate={foundedDate}
              onBeersButtonPress={handlePressBeers}
              onUrlButtonPress={handlePressUrl}
              onCountryButtonPress={handlePressCountry}
              onCityButtonPress={handlePressCity}
              name={name}
            />
          </View>

          <ShareButton onShareButtonPress={handleShare} />
        </ScrollView>
        <Navbar colour={navbarColour}/>

      </ImageBackground>
    </SafeAreaView>
  );
}

export default Brewery;
