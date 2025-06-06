import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getBreweryById } from "../../../utilities";
import IndividualBeerHeader from "../beer/IndividualBeerHeader";
import BreweryImage from "../brewery/BreweryImage";
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

  // USING THE BREWERY DATA
  const name = breweryData?.name || "Loading";
  const image = breweryData?.img_url;

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
        <BreweryImage image={image} />
      </ScrollView>
      <Navbar />
    </SafeAreaView>
  );
}

export default Brewery;
