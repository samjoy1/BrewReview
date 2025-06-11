import { auth, FIRESTORE_DB } from "@/firebaseconfig";
import { useNavigation } from "@react-navigation/native";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";

import {
  Image,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Header() {
  // const DUMMY_USER_ID = "bigdog512";
  // const auth = getAuth(FIREBASE_APP);
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);

  const [menuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation();

  // Listen for auth state changes and set current user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        // Fetch Firestore user data
        const docRef = doc(FIRESTORE_DB, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          setUserData(null);
          console.warn("No Firestore user doc found for uid:", user.uid);
        }
      } else {
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleNavigate = (screen) => {
    setMenuVisible(false);
    navigation.navigate(screen);
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setMenuVisible(false);
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    } catch (error) {
      alert("Sign out failed: " + error.message);
    }
  };

  return (
    <View className="h-16 bg-teal-500 flex-row items-center justify-between px-4 relative">
      <TouchableOpacity onPress={() => setMenuVisible(true)}>
        <Text className="text-white text-3xl">☰</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Image
          source={{
            uri: "https://i.imgur.com/NcshsBa.png",
          }}
          className="w-28 h-10 rounded-full"
        />
      </TouchableOpacity>

      {userData && (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => {
              if (currentUser?.uid) {
                navigation.navigate("Profile", { userId: currentUser.uid });
              }
            }}
          >
            <Image
              source={{
                uri:
                  currentUser.avatar_img_url ||
                  "https://randomuser.me/api/portraits/men/17.jpg",
              }}
              style={{ width: 32, height: 32, borderRadius: 16 }}
            />
          </TouchableOpacity>
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              marginLeft: 10,
              fontSize: 16,
            }}
          >
            {userData.username || "Guest"}
          </Text>
        </View>
      )}

      <Modal
        visible={menuVisible}
        transparent
        onRequestClose={() => setMenuVisible(false)}
      >
        <Pressable className="flex-1" onPress={() => setMenuVisible(false)}>
          <View className="absolute top-16 left-4 bg-white rounded-lg shadow-md py-2 px-4 w-40">
            <TouchableOpacity onPress={() => handleNavigate("Home")}>
              <Text className="py-2 text-gray-800">Home</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate("BeerList");
              }}
            >
              <Text className="py-2 text-gray-800">All Beers</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleNavigate("Search")}>
              <Text className="py-2 text-gray-800">Search</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleNavigate("PostReview")}>
              <Text className="py-2 text-gray-800">Add Review</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleNavigate("Categories")}>
              <Text className="py-2 text-gray-800">More Categories</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleNavigate("Map")}>
              <Text className="py-2 text-gray-800">Map</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleNavigate("Settings")}>
              <Text className="py-2 text-gray-800">Settings</Text>
            </TouchableOpacity>
            <View className="border-t border-gray-200 mt-2 pt-2">
              <TouchableOpacity onPress={handleSignOut}>
                <Text className="py-2 text-red-500 font-semibold">
                  Sign Out
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}
