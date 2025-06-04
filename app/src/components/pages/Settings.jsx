import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

function Settings() {
  return (
    <ScrollView>
      <View>
        <TouchableOpacity>
          <Text>Change Username</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity>
          <Text>Change Password</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity>
          <Text>Change Profile Picture</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity>
          <Text>Dark Mode</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity>
          <Text>About</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default Settings;
