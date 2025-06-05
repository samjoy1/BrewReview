import React from "react";
import { Image, View } from "react-native";

function BeerImage({ image }) {
  return (
    <View className="w-full h-48 bg-gray-200 rounded-xl justify-center items-center mb-4">
      <Image
        source={{
          uri: image?.length > 0 ? image: "",
        }}
        className="w-full h-full"
        resizeMode="contain"
      />
    </View>
  );
}

export default BeerImage;
