import React from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";

function Settings() {
  return (
    <ScrollView>
      <TouchableOpacity className="border bg-white border-gray-300 rounded-lg p-3">
        <Text className="text-lg font-semibold">Change Username</Text>
      </TouchableOpacity>

      <TouchableOpacity className="border bg-white border-gray-300 rounded-lg p-3">
        <Text className="text-lg font-semibold">Change Password</Text>
      </TouchableOpacity>

      <TouchableOpacity className="border bg-white border-gray-300 rounded-lg p-3">
        <Text className="text-lg font-semibold">Change Profile Picture</Text>
      </TouchableOpacity>

      <TouchableOpacity className="border bg-white border-gray-300 rounded-lg p-3">
        <Text className="text-lg font-semibold">Dark Mode</Text>
      </TouchableOpacity>

      <TouchableOpacity className="border bg-white border-gray-300 rounded-lg p-3">
        <Text className="text-lg font-semibold">About</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

export default Settings;
