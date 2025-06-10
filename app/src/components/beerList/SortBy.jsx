import { Picker } from "@react-native-picker/picker";
import React from "react";
import { Platform, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

function SortBy({ sortField, setSortField, sortDirection, setSortDirection }) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#d1d5db",
        paddingHorizontal: 8,
        height: 44,
        marginBottom: 12,
      }}
    >
      <Picker
        selectedValue={sortField}
        onValueChange={(itemValue) => setSortField(itemValue)}
        style={{
          flex: 1,
          height: Platform.OS === "ios" ? 44 : undefined,
        }}
        itemStyle={{ height: 40 }}
        dropdownIconColor="#000"
      >
        <Picker.Item label="Votes" value="votes" />
        <Picker.Item label="Name" value="name" />
        <Picker.Item label="ABV" value="percentage" />
      </Picker>

      <TouchableOpacity
        onPress={() =>
          setSortDirection(sortDirection === "asc" ? "desc" : "asc")
        }
        style={{
          padding: 6,
          borderWidth: 1,
          borderColor: "#4B5563",
          borderRadius: 6,
          backgroundColor: "#F3F4F6", 
          marginLeft: 8,
        }}
        accessibilityLabel="Toggle sort direction"
      >
        <Ionicons
          name={sortDirection === "asc" ? "arrow-up" : "arrow-down"}
          size={20}
          color="#1F2937" 
        />
      </TouchableOpacity>
    </View>
  );
}

export default SortBy;
