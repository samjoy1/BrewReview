import "@/global.css";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, {useState, useEffect} from "react";
import { FIREBASE_AUTH } from "../firebaseconfig"
import { onAuthStateChanged } from "firebase/auth"

// components
import {
  Beer,
  BeerList,
  Brewery,
  BreweryList,
  Camera,
  Categories,
  Home,
  Login,
  Map,
  PostBeer,
  PostReview,
  Profile,
  Search,
  Settings,
  User,
  Users,
} from "./src/components/pages/Componentsindex";

const Stack = createNativeStackNavigator();

export default function Index() {

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Beer" component={Beer} />
      <Stack.Screen name="BeerList" component={BeerList} />
      <Stack.Screen name="BreweryList" component={BreweryList} />
      <Stack.Screen name="Brewery" component={Brewery} />
      <Stack.Screen name="Camera" component={Camera} />
      <Stack.Screen name="Categories" component={Categories} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Map" component={Map} />
      <Stack.Screen name="PostBeer" component={PostBeer} />
      <Stack.Screen name="PostReview" component={PostReview} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="User" component={User} />
      <Stack.Screen name="Users" component={Users} />
    </Stack.Navigator>
  );
}
