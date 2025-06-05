import "@/global.css";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

const Stack = createNativeStackNavigator();

// components
import {
  Beer,
  Brewery,
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
  User,
  Users,
} from "./src/components/pages/Componentsindex";

export default function Index() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Beer" component={Beer} />
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
      <Stack.Screen name="RecentReviews" component={RecentReviews} />
      <Stack.Screen name="FavouriteBeers" component={FavouriteBeers} />
      <Stack.Screen name="FollowersPage" component={FollowersPage} />
      <Stack.Screen name="FollowingPage" component={FollowingPage} />
    </Stack.Navigator>
  );
}
