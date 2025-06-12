// FIREBASE
// import { FIREBASE_APP } from "@/firebaseconfig";
import { auth, FIRESTORE_DB } from "@/firebaseconfig";
// import { getAuth } from "firebase/auth";

// IMPORTS
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// import { UserContext } from "../../../index"
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export default function Header({ colour }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        const docRef = doc(FIRESTORE_DB, "users", user.uid);
        const docSnap = await getDoc(docRef);
        setUserData(docSnap.exists() ? docSnap.data() : null);
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
      navigation.reset({ index: 0, routes: [{ name: "Login" }] });
    } catch (error) {
      alert("Sign out failed: " + error.message);
    }
  };

  return (
    <View
      className={`h-16 flex-row items-center justify-between shadow-md px-4 m-4 rounded-xl ${colour}`}
    >
      <TouchableOpacity onPress={() => setMenuVisible(true)}>
        <Text className="text-white text-3xl">☰</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Image
          source={{ uri: "https://i.imgur.com/NcshsBa.png" }}
          className="w-32 h-12 rounded-full bg-violet-900"
        />
      </TouchableOpacity>

      {userData && (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Profile", { userId: currentUser.uid })
            }
          >
            <Image
              source={{
                uri:
                  userData.avatar_img_url ||
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
            {[
              "Home",
              "BeerList",
              "BreweryList",
              "Search",
              "PostReview",
              "Categories",
              "Map",
              "Settings",
            ].map((screen) => (
              <TouchableOpacity
                key={screen}
                onPress={() => handleNavigate(screen)}
              >
                <Text className="py-2 text-gray-800">
                  {screen.replace(/([A-Z])/g, " $1").trim()}
                </Text>
              </TouchableOpacity>
            ))}
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
