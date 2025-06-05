import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { FIREBASE_APP, FIRESTORE_DB } from "../firebaseconfig";

import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Avatar, Icon } from "react-native-elements";

function Profile() {
  const { userId } = useLocalSearchParams();
  const router = useRouter();

  const pickImageAndUpload = async () => {
    // Ask for permissions
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access media library is required!");
      return;
    }

    // Pick image
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const image = result.assets[0];
      const response = await fetch(image.uri);
      const blob = await response.blob();

      // Upload to Firebase Storage
      const storage = getStorage(FIREBASE_APP);
      const storageRef = ref(storage, `avatars/${userId}.jpg`);
      await uploadBytes(storageRef, blob);

      const downloadURL = await getDownloadURL(storageRef);

      // Update Firestore user profile
      const userRef = doc(FIRESTORE_DB, "users", userId);
      await updateDoc(userRef, {
        avatar_img_url: downloadURL,
      });

      // Update state to re-render
      setUser({ ...user, avatar_img_url: downloadURL });
    }
  };
  const [user, setUser] = useState(null);
  useEffect(() => {
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

  // 💡 Don't render the profile until the user is loaded
  if (!user) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="settings" type="feather" color="#000" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.avatarContainer}
          onPress={pickImageAndUpload}
        >
          <Avatar
            rounded
            size="large"
            icon={{ name: "user", type: "feather" }}
            source={user.avatar_img_url ? { uri: user.avatar_img_url } : null}
            containerStyle={styles.avatar}
          />
          <Text style={styles.username}>{user.username}</Text>
          <View style={styles.statsContainer}>
            <TouchableOpacity onPress={() => router.push("/FollowersPage")}>
              <Text style={styles.linkText}>
                {user.followers.length} followers
              </Text>
            </TouchableOpacity>
            <Text style={styles.dotSeparator}> · </Text>
            <TouchableOpacity onPress={() => router.push("/FollowingPage")}>
              <Text style={styles.linkText}>
                {user.following.length} following
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
        <Text style={{ fontSize: 12, color: "#666", marginTop: 4 }}>
          Tap to change avatar
        </Text>
      </View>

      {/* Sections */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/FavouriteBeers")}
      >
        <Text>Favourite beers</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/RecentReviews")}
      >
        <Text>Your most recent reviews</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/TasteProfile")}
      >
        <Text>Your taste profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#d7e6f6" },
  header: { padding: 20, alignItems: "center", backgroundColor: "#d7e6f6" },
  avatarContainer: { alignItems: "center", marginTop: 10 },
  avatar: { backgroundColor: "#ccc" },
  username: { fontSize: 14, fontWeight: "bold", marginTop: 10 },
  stats: { fontSize: 14, color: "#666" },
  sectionList: { padding: 20 },
  sectionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc",
  },
  button: {
    width: "100%",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginVertical: 8,
    borderWidth: 1,
    alignItems: "center",
  },
  halfButton: {
    width: "48%",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
  },
  largeBox: {
    width: "100%",
    height: 100,
    borderWidth: 1,
    borderRadius: 8,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  statsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  linkText: {
    color: "#007AFF",
    fontWeight: "500",
  },
  dotSeparator: {
    marginHorizontal: 5,
    color: "#555",
  },
});

export default Profile;
