import { addDoc, collection, doc, getDocs, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, TextInput } from "react-native";
import { FIRESTORE_DB } from "../firebaseconfig";


function ListOfBeers() {
  const [beers, setBeers] = useState([]);
  const [beer, setBeer] = useState("");
  //const [brewery, setBrewery] = useState("");

  useEffect(() => {
    const beerRef = collection(FIRESTORE_DB, "beers");
    getDocs(beerRef)
      .then((querySnapshot) => {
        //console.log(querySnapshot.docs[0].data())
        let compiledBeers = [];
        let newBeer = {};
        querySnapshot.docs.map((doc) => {
          newBeer = { ...doc.data() };
          newBeer.id = doc.id;
          compiledBeers.push(newBeer);
        });

        return compiledBeers;
      })
      .then((result) => {
        setBeers(result);
      });
  }, []);
 
  return (
    <View className="p-4 bg-gray-100 min-h-screen">
      <Text className="text-2xl font-bold mb-4 text-center text-blue-600">
        Beer List
      </Text>
      {beers.map((beer) => (
        <View
          key={beer.id}
          className="bg-white rounded-lg shadow-md p-4 mb-4 border border-gray-200"
        >
          <Text className="text-lg font-semibold text-gray-800">
            {beer.name}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default ListOfBeers;

