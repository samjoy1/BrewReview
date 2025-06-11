// IMPORTS
import { useContext, useEffect, useState } from "react";
import { ImageBackground, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Toast from 'react-native-toast-message';

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


function PostBeer ({ navigation }) {
    // STATES
    const { loggedInUser } = useContext(UserContext)

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
        <ScrollView className="relative flex-1">
            <ImageBackground source={ require("../../../../assets/images/BR-bg.png") }
                    className="relative flex-shrink p-2">
                <HeaverNav className=""/>
                <View className="flex-row justify-center mt-4">
                    <TouchableOpacity onPress={() => { navigation.navigate("PostReview")}}
                        className={review_rating_button_unselected+" rounded-l-xl"}>
                        Review</TouchableOpacity>
                    <TouchableOpacity onPress={() => { }}
                        className={review_rating_button_selected+" rounded-r-xl"}>
                        Beer</TouchableOpacity>
                </View>


                <View className="p-6">
                    <Text className="bg-zinc-800/90 rounded-xl color-white font-bold h-full text-2xl mb-2 mr-32 p-3"> Beer doesn't exist yet? Create one!</Text>
                    <BeerForm submitBeer={submitBeer}/>
                </View>
            </ImageBackground>
            <NavBar />
        </ScrollView>
    )
}

export default PostBeer



