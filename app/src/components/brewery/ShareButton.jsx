import { Share2 } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

function ShareButton({ onShareButtonPress }) {
  return (
    <View className="items-end">
      <TouchableOpacity
        className="flex-row items-center border border-gray-300 rounded-lg px-4 py-2"
        onPress={onShareButtonPress}
      >
        <Share2 size={20} color="gray" />
        <Text className="ml-2 text-gray-700">Share</Text>
      </TouchableOpacity>
    </View>
  );
}

export default ShareButton;
