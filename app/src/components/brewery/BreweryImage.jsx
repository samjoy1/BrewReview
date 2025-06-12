import React from "react";
import { Image, View } from "react-native";

function BreweryImage({ image }) {
  return (
    <View className="w-full h-80 bg-stone-900 rounded-xl justify-center items-center mb-4 px-4 shadow-lg">
      <Image
        source={{
          uri:
            image?.length > 0
              ? image
              : "https://imgs.search.brave.com/KcyPbtIKqz0pjx89GaJaRuA2ZIv35XqnRYCj5zclrzg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA4LzY0LzU3LzEw/LzM2MF9GXzg2NDU3/MTAwMl96ZG0xTEJk/TXJiMVBzSFBNWmZo/YzhRZzg2S0IwUW9m/YS5qcGc",
        }}
        className="w-full h-full"
        resizeMode="contain"
      />
    </View>
  );
}

export default BreweryImage;