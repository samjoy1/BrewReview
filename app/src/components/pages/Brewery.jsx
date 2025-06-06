import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getBreweryById } from "../../../utilities";
import BreweryImage from "../brewery/BreweryImage";
import BreweryInfoButtons from "../brewery/BreweryInfoButtons";
import IndividualBreweryHeader from "../brewery/IndividualBreweryHeader";
import Header from "./HeaderNav";
import Navbar from "./NavBar";

function Brewery() {
  // HOOKS
  const [liked, setLiked] = useState(false);
  const [breweryData, setBreweryData] = useState(null);
  const route = useRoute();
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
  // should go to all beers filtered by country
  function handlePressCountry() {
    navigation.navigate("Search");
  }

  // go to the url provided
  function handlePressUrl() {
    navigation.navigate("Search");
  }

  // go to beers filtered by brewery selected
  function handlePressBeers() {
    navigation.navigate("Search");
  }

  function handlePressCity() {
    // do something nice and cool, dno yet
    navigation.navigate("Search");
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
          onCountyButtonPress={handlePressCountry}
          onCityButtonPress={handlePressCity}
          name={name}
        />
      </ScrollView>
      <Navbar />
    </SafeAreaView>
  );
}

export default Brewery;
