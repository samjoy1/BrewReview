import * as ImagePicker from "expo-image-picker";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FIRESTORE_DB } from "../../../../firebaseconfig";
import Navbar from "./NavBar";

import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Avatar, Icon } from "react-native-elements";

function Profile({ route, navigation }) {
  const { userId } = route.params;

  // Image uploader function
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
      /*
        The commented code below is the better solution for a production environment but without upgrading the Firebase basic plan we cannot use Firebase Storage
        
        Therefore, the non-commented code is a temporary solution to at least be able to change the profile avatar picture for one session (when page is refreshed the avatar
        will change back to the original one, as we do not have anywhere to persist it with the firebase free plan
      */

      // const response = await fetch(image.uri);
      // const blob = await response.blob();

      // const storage = getStorage(FIREBASE_APP);
      // const storageRef = ref(storage, `avatars/${userId}.jpg`);
      // await uploadBytes(storageRef, blob);

      // const downloadURL = await getDownloadURL(storageRef);

      // const userRef = doc(FIRESTORE_DB, "users", userId);
      // await updateDoc(userRef, {
      //   avatar_img_url: downloadURL,
      // });
      // setUser({ ...user, avatar_img_url: downloadURL });
      setUser({ ...user, avatar_img_url: image.uri });
    }
  };
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (!userId) {
      console.warn("No userId provided to Profile screen.");
      return;
    }
    async function fetchUser() {
      try {
        const docRef = doc(FIRESTORE_DB, "users", userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUser(docSnap.data());
        } else {
          console.log("No user profile found!");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    }

    fetchUser();
  }, [userId]);

  // Don't render the profile until the user is loaded
  if (!user) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
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
              source={user.avatar_img_url ? { uri: user.avatar_img_url } : null}
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
      </ScrollView>
      <Navbar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f5f9",
  },
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
