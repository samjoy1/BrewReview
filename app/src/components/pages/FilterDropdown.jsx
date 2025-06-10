import React, { useState } from "react";
import { View } from "react-native";
import { Menu, Button } from "react-native-paper";

export function FilterDropdown({ label, items, selectedValue, onSelect }) {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <View style={{ marginBottom: 16 }}>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <Button
            mode="outlined"
            onPress={openMenu}
            contentStyle={{ justifyContent: "space-between" }}
          >
            {selectedValue || `Select ${label}`}
          </Button>
        }
      >
        <Menu.Item
          onPress={() => {
            onSelect("");
            closeMenu();
          }}
          title={`Any`}
        />
        {items.map((item) => (
          <Menu.Item
            key={item}
            onPress={() => {
              onSelect(item);
              closeMenu();
            }}
            title={item}
          />
        ))}
      </Menu>
    </View>
  );
}
