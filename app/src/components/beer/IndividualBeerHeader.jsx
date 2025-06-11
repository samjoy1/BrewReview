import { Heart } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

function IndividualBeerHeader({ name, liked, onHeartButtonPress }) {
  return (
    <View className="flex-row h-16 justify-between items-center mb-4 rounded-xl bg-yellow-500 border-2 border-yellow-400 px-4 shadow-lg">
      <Text className="text-xl font-bold">{name}</Text>
      <TouchableOpacity onPress={onHeartButtonPress}>
        <Heart
          size={28}
          color={liked ? "red" : "gray"}
          fill={liked ? "red" : "none"}
        />
      </TouchableOpacity>
    </View>
  );
}

export default IndividualBeerHeader;
