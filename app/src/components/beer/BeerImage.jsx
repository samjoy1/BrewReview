import React from "react";
import { ImageBackground, Text, View } from "react-native";

function BeerImage({ image, percentage }) {
  return (
    <View className="w-full h-80 bg-stone-900 rounded-xl justify-center items-center mb-4 px-4 shadow-lg">
      <ImageBackground
        source={{
          uri:
            image?.length > 0
              ? image
              : "https://imgs.search.brave.com/HTnfzB4GPTeNE42Sm6aAH116T7QcNedDW2gE4mTiaks/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvNTQ1/ODY0NTU5L3Bob3Rv/L3VzYS1uZXctamVy/c2V5LWhhbmQtcG91/cmluZy1iZWVyLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz1F/Y0R2MXRqbjM1eEJt/amtUR0dkMmRTYk9P/eWZ1U0dTSWhlNUtM/bE5xSjFVPQ",
        }}
        className="w-full h-full"
        resizeMode="contain"
      >
      <View className="bg-yellow-500 border-yellow-400 border-4 flex-row rounded-full h-16 w-16 justify-center"><Text className="font-bold text-center text-lg content-center">{ percentage ? `${percentage}%` : "ABV%"}</Text></View>
      </ImageBackground>
    </View>
  );
}

export default BeerImage;
