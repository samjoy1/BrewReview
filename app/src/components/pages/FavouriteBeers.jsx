import { useContext, useEffect, useState } from "react";
import { FlatList, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { UserContext } from "../../../index";
import { getBeerById, getUserById } from "../../../scripts/fetch";
import Header from "./HeaderNav";
import Navbar from "./NavBar";

function FavouriteBeers() {
  const { loggedInUser } = useContext(UserContext);
  const [favouriteBeers, setFavouriteBeers] = useState([]);

  if (!loggedInUser) {
    Toast.show({
      type: "error",
      text1: "Cannot fetch favourites as there is no logged in user",
    });
    setFavouriteBeers([]);
    return null;
  }

  useEffect(() => {
    getUserById(loggedInUser)
      .then((userData) => {
        if (userData && Array.isArray(userData.favourite_beers)) {
          const beerIds = userData.favourite_beers;

          if (beerIds.length === 0) {
            Toast.show({
              type: "error",
              text1: "No favourite beers found",
            });
            return [];
          }
          // Fetch all beer details using Promise.all
          return Promise.all(
            beerIds.map((beerId) =>
              getBeerById(beerId).then((beerData) => {
                console.log(
                  `FavouriteBeers: Fetched beer data for ID ${beerId}:`,
                  beerData
                );
                return beerData;
              })
            )
          );
        } else {
          console.log(
            "FavouriteBeers: User data or favourite_beers array is invalid or empty."
          );
          return [];
        }
      })
      .then((beers) => {
        // Filter out any undefined/null beers (in case some failed to fetch)
        const validBeers = beers.filter((beer) => beer != null);
        setFavouriteBeers(validBeers);
      })
      .catch((err) => {
        console.error("Error fetching favourite beers:", err);
      });
  }, [loggedInUser]);

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <Header />
      <View className="flex-1">
        <FlatList
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 100 }}
          data={favouriteBeers}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: "row",
                padding: 16,
                alignItems: "center",
              }}
            >
              <Image
                source={{ uri: item.img_url }}
                style={{ width: 60, height: 60, borderRadius: 8 }}
              />
              <Text style={{ marginLeft: 16, fontSize: 16 }}>{item.name}</Text>
            </View>
          )}
          ListEmptyComponent={() => (
            <Text style={{ textAlign: "center", marginTop: 20 }}>
              No favourites yet
            </Text>
          )}
        />
      </View>
      <Navbar />
    </SafeAreaView>
  );
}

export default FavouriteBeers;
