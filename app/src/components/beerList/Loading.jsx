import React from "react";
import { ActivityIndicator, Text, View } from "react-native";

function Loading({ message = "Loading..." }) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <ActivityIndicator size="large" color="#f59e0b" />
      <Text style={{ marginTop: 10, fontSize: 16, color: "#f59e0b" }}>
        {message}
      </Text>
    </View>
  );
}

export default Loading;
