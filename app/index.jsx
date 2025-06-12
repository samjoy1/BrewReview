// imports
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import React, { createContext, useState } from "react";

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
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [loggedInUser, setLoggedInUser] = useState({
    id: "brewcat108",
    username: "brewcat108",
    name: "Vibha Kouser",
    email: "vibha.kouser@example.com",
    password: "astro",
    phone: 8147444873,
    country: "India",
    avatar_img_url: "https://randomuser.me/api/portraits/women/27.jpg",
    created_at: 1690359120,
    favourite_beers: ["hells", "double_ghost"],
    favourite_categories: [
      "IPA",
      "golden_ale",
      "brown_ale",
      "pilsner",
      "lager",
    ],
    favourite_tags: [],
    reviews: ["hells", "313_craft"],
    following: [],
    followers: [],
    preferences: {
      background: "black",
      navbarColour: "bg-stone-900",
      keepLoggedIn: false,
      sendEmailNotifications: false,
    },
  });
  const [background, setBackground] = useState(
    isLoggedIn ? loggedInUser.preferences.background : "black"
  );
  const [navbarColour, setNavbarColour] = useState(
    isLoggedIn ? loggedInUser.preferences.navbarColour : "bg-stone-900"
  );

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
        background,
        setBackground,
        navbarColour,
        setNavbarColour,
      }}
    >
      <Stack.Navigator>
        {user ? (
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
