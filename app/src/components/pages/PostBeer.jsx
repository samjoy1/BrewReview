// IMPORTS
import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import Toast from 'react-native-toast-message';
import { ImageBackground, ScrollView, SafeAreaView, Text, TouchableOpacity, View } from "react-native";

import { UserContext } from "../../../index.jsx";
// SCRIPTS
import { postBeer } from "../../../scripts/post";

// COMPONENTS
import HeaverNav from "../pages/HeaderNav";
import NavBar from "../pages/NavBar";
import BeerForm from "../postBeer/BeerForm.jsx";

// STYLING
let review_rating_button_selected = "font-bold text-center bg-sky-500 w-40 p-3"
let review_rating_button_unselected = "font-bold text-center bg-white w-40 p-3"

function PostBeer () {
    // STATES
    const { loggedInUser } = useContext(UserContext)

    const navigation = useNavigation()

    const [beer, setBeer] = useState({
        id: "",
        name: "",
        country: "",
        category: "",
        brewery: "",
        logo_url: "",
        img_url: "",
        percentage: 0,
        tags: [],
        reviews: [],
    })

    // VALIDATION
    function isBeerValid (newBeer) {
        if (!newBeer.name) {
            Toast.show({
                type: "error",
                text1: "Please enter a name for your beer"
            })
            return false
        }
        if (!newBeer.country) {
            Toast.show({
                type: "error",
                text1: "Please enter the country your beer is from"
            })
            return false
        }
        if (!newBeer.category) {
            Toast.show({
                type: "error",
                text1: "Please select a category"
            })
            return false
        }
        return true
    }

    // SUBMIT
    function submitBeer (newBeer) {
        setBeer(newBeer)
        if (isBeerValid(newBeer)) {
            postBeer(newBeer)
            Toast.show({
                type: "success",
                text1: "You just created a new Beer! Why not give it a rating?"
            })
        }
        // should reload the page
    }
        

    useEffect(() => {
    }, [])

    return (
        <SafeAreaView className="flex-1">
            {/* <ImageBackground source={
                loggedInUser.preferences.background==="black" ? require("../../../../assets/images/BR-bg-black.png") : 
                loggedInUser.preferences.background==="white" ? require("../../../../assets/images/BR-bg-white.png") : 
                loggedInUser.preferences.background==="green" ? require("../../../../assets/images/BR-bg-green.png") : 
                loggedInUser.preferences.background==="yellow" ? require("../../../../assets/images/BR-bg-yellow.png") :
                loggedInUser.preferences.background==="blue" ? require("../../../../assets/images/BR-bg-yellow.png") :
                loggedInUser.preferences.background==="brown" ? require("../../../../assets/images/BR-bg-yellow.png") :
                require("../../../../assets/images/BR-bg-black.png")
                } */
                /* className="relative flex-shrink"> */}
            <HeaverNav />
            <ScrollView className="relative flex-1">
                
                <View className="flex-row justify-center mt-4">
                    <TouchableOpacity onPress={() => { navigation.navigate("PostReview")}}
                        className={review_rating_button_unselected+" rounded-l-xl"}>
                        Review</TouchableOpacity>
                    <TouchableOpacity onPress={() => {}}
                        className={review_rating_button_selected+" rounded-r-xl"}>
                        Beer</TouchableOpacity>
                </View>

                <View className="p-6">
                    <Text className="bg-zinc-800/90 rounded-xl color-white font-bold h-full text-2xl mb-2 mr-32 p-3"> Beer doesn't exist yet? Create one!</Text>
                    <BeerForm submitBeer={submitBeer}/>
                </View>
                
            </ScrollView>
            {/* </ImageBackground> */}
            <NavBar />
        </SafeAreaView>
    )
}

export default PostBeer



