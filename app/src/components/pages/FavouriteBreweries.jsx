import { useContext, useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { UserContext } from "../../../index";
import { getBreweryById, getUserById } from "../../../scripts/fetch";
import BreweryCard from "../breweryList/BreweryCard";
import Header from "./HeaderNav";
import Navbar from "./NavBar";

function FavouriteBreweries({ navigation }) {
  const { loggedInUser } = useContext(UserContext);
  const [favouriteBreweries, setFavouriteBreweries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!loggedInUser) {
      Toast.show({
        type: "error",
        text1: "Cannot fetch favourites as there is no logged in user",
        position: "bottom",
      });
      setFavouriteBreweries([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    getUserById(loggedInUser)
      .then((userData) => {
        if (userData && Array.isArray(userData.favourite_breweries)) {
          const breweryIds = userData.favourite_breweries;

          if (breweryIds.length === 0) {
            Toast.show({
              type: "info",
              text1: "No favourite breweries found",
              position: "bottom",
            });
            return [];
          }
          return Promise.all(
            breweryIds.map((breweryId) =>
              getBreweryById(breweryId).catch((err) => {
                console.error(`Error fetching brewery ID ${breweryId}:`, err);
                return null;
              })
            )
          );
        } else {
          console.log(
            "FavouriteBreweries: User data or favourite_breweries array is invalid or empty."
          );
          return [];
        }
      })
      .then((breweries) => {
        const validBreweries = breweries.filter((brewery) => brewery != null);
        setFavouriteBreweries(validBreweries);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching favourite breweries:", err);
        Toast.show({
          type: "error",
          text1: "Failed to fetch favourite breweries",
          text2: err.message,
          position: "bottom",
        });
        setFavouriteBreweries([]);
        setIsLoading(false);
      });
  }, [loggedInUser]);

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <Header />
      <View className="flex-1 px-4">
        {isLoading ? (
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            Loading favourite breweries...
          </Text>
        ) : (
          <FlatList
            style={{ flex: 1 }}
            contentContainerStyle={{ paddingBottom: 100 }}
            numColumns={2}
            data={favouriteBreweries}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <BreweryCard
                brewery={item}
                navigation={navigation}
                cardWidth="48%"
              />
            )}
            ListEmptyComponent={() =>
              !loggedInUser ? null : (
                <Text style={{ textAlign: "center", marginTop: 20 }}>
                  No favourite breweries yet.
                </Text>
              )
            }
          />
        )}
      </View>
      <Navbar />
    </SafeAreaView>
  );
}

export default FavouriteBreweries;
