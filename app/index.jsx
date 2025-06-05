// imports
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { createContext, useState } from "react";

// styling
import "@/global.css";

// components
import {
  Home,
  Search, Categories, BeerList, BreweryList, 
  Beer, Brewery,
  Camera, Map,
  PostBeer, PostReview,
  Login, Profile, Settings,
  User, Users,
} from "./src/components/pages/Componentsindex";

// variables
export const UserContext = createContext(null)
const Stack = createNativeStackNavigator();

export default function Index() {
  // useStates
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [loggedInUser, setLoggedInUser] = useState("brewcat108")
  const [theme, setTheme] = useState("light")

  return (
    <UserContext.Provider value={{isLoggedIn, setIsLoggedIn, loggedInUser, setLoggedInUser, theme, setTheme}}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Beer" component={Beer} />
        <Stack.Screen name="BeerList" component={BeerList} />
        <Stack.Screen name="Brewery" component={Brewery} />
        <Stack.Screen name="BreweryList" component={BreweryList} />  
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
    </UserContext.Provider>
  )
}
