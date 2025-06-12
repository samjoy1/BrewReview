// imports
import { FIRESTORE_DB } from "@/firebaseconfig";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { doc, getDoc } from "firebase/firestore";

import React, { createContext, useEffect, useState } from "react";

import { ActivityIndicator, View } from "react-native";

import { auth } from "@/firebaseconfig";
import { onAuthStateChanged } from "firebase/auth";

// styling
import "@/global.css";

// Firebase

// components
import { StyleSheet } from "react-native";
import {
  Beer,
  BeerList,
  Brewery,
  BreweryList,
  Camera,
  Categories,
  FavouriteBeers,
  FavouriteBreweries,
  FollowersPage,
  FollowingPage,
  Home,
  Login,
  Map,
  PostBeer,
  PostReview,
  Profile,
  RecentReviews,
  Settings,
  SignUp,
  User,
  Users,
} from "./src/components/pages/Componentsindex";

// variables
export const UserContext = createContext(null);
const Stack = createNativeStackNavigator();

export default function Index() {
  // useStates
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [initializing, setInitializing] = useState(true);

  const [loggedInUser, setLoggedInUser] = useState(null);
  const [background, setBackground] = useState("black");
  const [navbarColour, setNavbarColour] = useState("bg-stone-900");

  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setIsLoggedIn(true);
        // Fetch user profile from Firestore
        try {
          const userDocRef = doc(FIRESTORE_DB, "users", firebaseUser.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setLoggedInUser({ id: firebaseUser.uid, ...userData });

            // Set theming preferences from fetched user
            setBackground(userData.preferences?.background || "black");
            setNavbarColour(
              userData.preferences?.navbarColour || "bg-stone-900"
            );
          } else {
            // No user profile found, set minimal data
            setLoggedInUser({
              id: firebaseUser.uid,
              email: firebaseUser.email,
              preferences: {
                background: "black",
                navbarColour: "bg-stone-900",
              },
            });
            setBackground("black");
            setNavbarColour("bg-stone-900");
          }
        } catch (error) {
          console.warn("Failed to fetch user data:", error);
          setLoggedInUser(null);
          setBackground("black");
          setNavbarColour("bg-stone-900");
        }
      } else {
        setIsLoggedIn(false);
        setLoggedInUser(null);
        setBackground("black");
        setNavbarColour("bg-stone-900");
      }
      setInitializing(false);
    });

    return unsubscribe;
  }, []);

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     setBackground(loggedInUser.preferences.background);
  //     setNavbarColour(loggedInUser.preferences.navbarColour);
  //   } else {
  //     setBackground("black");
  //     setNavbarColour("bg-stone-900");
  //   }
  // }, [isLoggedIn, loggedInUser]);

  if (initializing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  console.log("Setting context: loggedInUser", loggedInUser);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        background,
        setBackground,
        navbarColour,
        setNavbarColour,
        isLoggedIn,
        loggedInUser,
      }}
    >
      <Stack.Navigator>
        {isLoggedIn ? (
          <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Beer" component={Beer} />
            <Stack.Screen name="BeerList" component={BeerList} />
            <Stack.Screen name="BreweryList" component={BreweryList} />
            <Stack.Screen name="Brewery" component={Brewery} />
            <Stack.Screen name="Camera" component={Camera} />
            <Stack.Screen name="Categories" component={Categories} />
            <Stack.Screen name="Map" component={Map} />
            <Stack.Screen name="PostBeer" component={PostBeer} />
            <Stack.Screen name="PostReview" component={PostReview} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Search" component={Search} />
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="User" component={User} />
            <Stack.Screen name="Users" component={Users} />
            <Stack.Screen name="FollowersPage" component={FollowersPage} />
            <Stack.Screen name="FollowingPage" component={FollowingPage} />
            <Stack.Screen name="RecentReviews" component={RecentReviews} />
            <Stack.Screen name="FavouriteBeers" component={FavouriteBeers} />
            <Stack.Screen
              name="FavouriteBreweries"
              component={FavouriteBreweries}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
          </>
        )}
      </Stack.Navigator>
    </UserContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flex: 1,
    justifyContent: "center",
  },
  input: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#fff",
  },
});
