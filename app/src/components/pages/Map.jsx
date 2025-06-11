import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Dimensions, Platform, StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { FIRESTORE_DB } from "../../../../firebaseconfig";

export default function Map() {
  
  const [breweries, setBreweries] = useState([]);
  const region = {
    latitude: 55.3781,
    longitude: -3.436,
    latitudeDelta: 10,
    longitudeDelta: 15,
  };

  useEffect(() => {
    getDocs(collection(FIRESTORE_DB, "breweries"))
      .then((snapshot) => {
        const list = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBreweries(list);
      })
      .catch(console.error);
  }, []);

  if (Platform.OS === "web") {
    return (
      <View style={styles.center}>
        <Text>Map is only available on iOS/Android</Text>
      </View>
    );
  }
  const { default: MapView, Marker } = require("react-native-maps");

  return (
    <MapView style={styles.map} initialRegion={region}>
      {breweries.map((brew) => (
        <Marker
          key={brew.id}
          coordinate={{ latitude: brew.latitude, longitude: brew.longitude }}
          title={brew.name}
          description={brew.location}
        />
      ))}
    </MapView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
