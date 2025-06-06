import { useNavigation, useRoute } from "@react-navigation/native";
import * as Linking from "expo-linking";
import { useEffect, useState } from "react";
import { ScrollView, Share } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { getBreweryById } from "../../../utilities";
import BreweryImage from "../brewery/BreweryImage";
import BreweryInfoButtons from "../brewery/BreweryInfoButtons";
import IndividualBreweryHeader from "../brewery/IndividualBreweryHeader";
import ShareButton from "../brewery/ShareButton";
import Header from "./HeaderNav";
import Navbar from "./NavBar";

function Brewery() {
  // HOOKS
  const [liked, setLiked] = useState(false);
  const [breweryData, setBreweryData] = useState(null);
  const route = useRoute();
  const navigation = useNavigation();
  const { breweryID } = route.params || {};

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
  function handlePressHeartButton() {
    setLiked(!liked);
  }
  // make this filtered by country
  function handlePressCountry() {
    navigation.navigate("BeerList");
  }

  // go to the url provided
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

  // make this filtered by the brewery
  function handlePressBeers() {
    navigation.navigate("BeerList");
  }

  function handlePressCity() {
    // take user to a pin of the brewery on the map!!!
    navigation.navigate("Search");
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
    <SafeAreaView className="flex-1 bg-gray-100">
      <Header />
      <ScrollView
        className="p-4"
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <IndividualBreweryHeader
          name={name}
          liked={liked}
          foundedDate={foundedDate}
          onHeartButtonPress={handlePressHeartButton}
        />
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

        <ShareButton onShareButtonPress={handleShare} />
      </ScrollView>
      <Navbar />
    </SafeAreaView>
  );
}

export default Brewery;
