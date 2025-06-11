// imports
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { createContext, useEffect, useState } from "react";

// styling
import "@/global.css";

// Firebase
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseconfig";

// components
import { ActivityIndicator, StyleSheet, View } from "react-native";
import {
  Beer,
  BeerList,
  Brewery,
  BreweryList,
  Camera,
  Categories,
  FavouriteBeers,
  FollowersPage,
  FollowingPage,
  Home,
  Login,
  Map,
  PostBeer,
  PostReview,
  Profile,
  RecentReviews,
  Search,
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
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [loading, setLoading] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [loggedInUser, setLoggedInUser] = useState("brewcat108");
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setInitializing(false);
    });
    return unsubscribe;
  }, []);

  if (initializing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        theme,
        setTheme,
      }}
    >
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Beer" component={Beer} />
            <Stack.Screen name="BeerList" component={BeerList} />
            <Stack.Screen name="Brewery" component={Brewery} />
            <Stack.Screen name="BreweryList" component={BreweryList} />
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
