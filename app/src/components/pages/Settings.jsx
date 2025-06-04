import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import ToggleSwitch from "toggle-switch-react-native";

/*
TO DO
1 - implement functionality for change username ()
2 - add a log in / log out button and implement functionality for that
3 - implement functionality for changing profile picture
4 - implement functionality for changing the theme with dark mode
5 - have about actually re direct the user to a within app read me 
*/

function Settings() {
  const [isDarkModeOn, setIsDarkModeOn] = useState(false);

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

      <View className="border bg-white border-gray-300 rounded-lg p-3 flex-row justify-between items-center">
        <Text className="text-lg font-semibold">Dark Mode</Text>
        <ToggleSwitch
          isOn={isDarkModeOn}
          onColor="green"
          offColor="gray"
          size="medium"
          onToggle={(isOn) => {
            setIsDarkModeOn(isOn);
            console.log("Dark mode changed to : ", isOn);
          }}
        />
      </View>

      <TouchableOpacity className="border bg-white border-gray-300 rounded-lg p-3">
        <Text className="text-lg font-semibold">About</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

export default Settings;
