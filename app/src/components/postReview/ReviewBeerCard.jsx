// IMPORTS
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Image, View } from "react-native";
import { FIRESTORE_DB } from "../../../../firebaseconfig.js";

function ReviewBeerCard ( {posting_beer} ) {

    useEffect(() => {
    }, [])

    return (
        <View className="w-full h-48 bg-yellow-900/60 rounded-xl justify-center items-center mb-4 border border-amber-300/90">
            { posting_beer ? 
            <View>
                <Image
                    source={{
                        uri:
                        posting_beer.img_url
                            ? posting_beer.img_url
                            : "https://imgs.search.brave.com/HTnfzB4GPTeNE42Sm6aAH116T7QcNedDW2gE4mTiaks/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvNTQ1/ODY0NTU5L3Bob3Rv/L3VzYS1uZXctamVy/c2V5LWhhbmQtcG91/cmluZy1iZWVyLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz1F/Y0R2MXRqbjM1eEJt/amtUR0dkMmRTYk9P/eWZ1U0dTSWhlNUtM/bE5xSjFVPQ",
                    }}
                    className="w-full h-full"
                    resizeMode="contain"
                />
            </View>
            :
            <View></View>
            }
        </View>
    )
}

export default ReviewBeerCard