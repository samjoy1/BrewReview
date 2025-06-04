import { Heart } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

function Header({ name, liked, onHeartButtonPress }) {
  return (
    <View className="flex-row justify-between items-center mb-4">
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

export default Header;
