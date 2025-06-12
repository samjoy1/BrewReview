// IMPORTS
import * as ImagePicker from "expo-image-picker";
import { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Avatar, Icon } from "react-native-elements";

import { UserContext } from "../../../index.jsx";

import {
  BgColourPicker,
  ConfirmButton,
  DeleteAccountButton,
  LogoutButton,
  NavColourPicker,
} from "../profile/index.jsx";
import Header from "./HeaderNav";
import Navbar from "./NavBar";

function Profile({ navigation }) {
  let { loggedInUser, setLoggedInUser, background, navbarColour } =
    useContext(UserContext);
  const user = loggedInUser;

  const [tempBackground, setTempBackground] = useState("black");
  const [tempNavbarColour, setTempNavbarColour] = useState("bg-zinc-800");

  const pickImageAndUpload = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access media library is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const image = result.assets[0];
      setLoggedInUser({ ...user, avatar_img_url: image.uri });
    }
  };

  useEffect(() => {
    console.log("loggedInUser from context:", loggedInUser);
  }, [loggedInUser]);

  if (!user) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1">
      <ImageBackground
        source={
          tempBackground === "black"
            ? require("../../../../assets/images/BR-bg-black.png")
            : tempBackground === "white"
            ? require("../../../../assets/images/BR-bg-white.png")
            : tempBackground === "green"
            ? require("../../../../assets/images/BR-bg-green.png")
            : tempBackground === "yellow"
            ? require("../../../../assets/images/BR-bg-yellow.png")
            : tempBackground === "blue"
            ? require("../../../../assets/images/BR-bg-blue.png")
            : tempBackground === "brown"
            ? require("../../../../assets/images/BR-bg-brown.png")
            : require("../../../../assets/images/BR-bg-black.png")
        }
        className="relative flex-shrink"
      >
        <Header colour={tempNavbarColour} />
        <ScrollView
          className="p-4"
          style={styles.container}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.settingsIcon}>
              <Icon name="settings" type="feather" color="#000" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.avatarContainer}
              onPress={pickImageAndUpload}
            >
              <Avatar
                rounded
                size="xlarge"
                icon={{ name: "user", type: "feather" }}
                source={
                  user.avatar_img_url ? { uri: user.avatar_img_url } : null
                }
                containerStyle={styles.avatar}
              />
              <Text style={styles.username}>{user.username}</Text>
              <View style={styles.statsContainer}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Users", {
                      userIds: user.followers || [],
                    })
                  }
                >
                  <Text style={styles.linkText}>
                    {Array.isArray(user.followers) ? user.followers.length : 0}{" "}
                    followers
                  </Text>
                </TouchableOpacity>
                <Text style={styles.dotSeparator}> · </Text>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Users", {
                      userIds: user.following || [],
                    })
                  }
                >
                  <Text style={styles.linkText}>
                    {Array.isArray(user.following) ? user.following.length : 0}{" "}
                    following
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
            <Text style={styles.tapHint}>Tap to change avatar</Text>
          </View>

          {/* Sections */}
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("FavouriteBeers")}
            >
              <Text style={styles.buttonText}>🍺 Favourite Beers</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("FavouriteBreweries")}
            >
              <Text style={styles.buttonText}>🍺 Favourite Breweries</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("RecentReviews")}
            >
              <Text style={styles.buttonText}>📝 Recent Reviews</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("TasteProfile")}
            >
              <Text style={styles.buttonText}>👅 Taste Profile</Text>
            </TouchableOpacity>
          </View>
          <BgColourPicker
            tempBackground={tempBackground}
            setTempBackground={setTempBackground}
          />
          <NavColourPicker
            tempNavbarColour={tempNavbarColour}
            setTempNavbarColour={setTempNavbarColour}
          />
          <View>
            <ConfirmButton
              user={user}
              tempBackground={tempBackground}
              tempNavBarColour={tempNavbarColour}
            />
            <LogoutButton navigation={navigation} />
            <DeleteAccountButton
              tempNavbarColour={tempNavbarColour}
              setTempNavbarColour={setTempNavbarColour}
            />
          </View>
        </ScrollView>
        <Navbar colour={tempNavbarColour} />
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f1f5f9",
  },
  header: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: "center",
    backgroundColor: "#e2e8f0",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  settingsIcon: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  avatarContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  avatar: {
    backgroundColor: "#ccc",
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 15,
    color: "#111",
  },
  statsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  linkText: {
    color: "#007AFF",
    fontWeight: "600",
    fontSize: 14,
  },
  dotSeparator: {
    marginHorizontal: 8,
    fontSize: 14,
    color: "#555",
  },
  tapHint: {
    fontSize: 12,
    color: "#666",
    marginTop: 6,
  },
  buttonsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  button: {
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginVertical: 8,
    borderColor: "#ccc",
    borderWidth: 1,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#222",
  },
});

export default Profile;
