import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Dimensions, Linking, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { FIRESTORE_DB } from "../../../../firebaseconfig";
import Header from "./HeaderNav";
import Navbar from "./NavBar";

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

  return (
    <>
      <Header />
      <MapView style={styles.map} initialRegion={region}>
        {breweries.map((brew) => (
          <Marker
            key={brew.id}
            coordinate={{ latitude: brew.latitude, longitude: brew.longitude }}
            title={brew.name}
            description={brew.url}
            onCalloutPress={() => Linking.openURL(brew.url)}
          />
        ))}
      </MapView>
      <Navbar />
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
