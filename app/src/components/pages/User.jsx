import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { FIRESTORE_DB } from "../../../../firebaseconfig";

export default function User({ route }) {
  const { userId } = route.params;
  const [user, setUser] = useState(null);

  useEffect(() => {
    getDoc(doc(FIRESTORE_DB, "users", userId))
      .then((docSnap) => {
        setUser({ id: docSnap.id, ...docSnap.data() });
      })
      .catch((err) => console.error(err));
  }, [userId]);

  if (!user) return null;

  return (
    <ScrollView style={{ padding: 16 }}>
      {/* avatar and name */}
      <View style={{ alignItems: "center", marginBottom: 24 }}>
        {user.avatar_img_url ? (
          <Image
            source={{ uri: user.avatar_img_url }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              marginBottom: 12,
            }}
          />
        ) : (
          <View
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              backgroundColor: "lightgrey",
              marginBottom: 12,
            }}
          />
        )}
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>{user.name}</Text>
        <Text style={{ fontSize: 16, color: "grey" }}>@{user.username}</Text>
      </View>

      {/* followers & following*/}
      <View style={{ flexDirection: "row", marginBottom: 24 }}>
        {/* followers button */}
        <TouchableOpacity onPress={() => {}} style={{ marginRight: 16 }}>
          <Text>
            Followers: {user.followers?.length || 0}
          </Text>
        </TouchableOpacity>

        {/* Following button */}
        <TouchableOpacity onPress={() => {}}>
          <Text>
            Following: {user.following?.length || 0}
          </Text>
        </TouchableOpacity>
      </View>

      {/* favourite beers */}
      <View style={{ marginBottom: 24 }}>
        <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 8 }}>
          Favourite Beers
        </Text>
        {Array.isArray(user.favourite_beers) &&
        user.favourite_beers.length > 0 ? (
          user.favourite_beers.map((beer) => <Text key={beer}>🍺 {beer}</Text>)
        ) : (
          <Text>No favourites yet.</Text>
        )}
      </View>

      {/* reviews */}
      <View style={{ marginBottom: 24 }}>
        <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 8 }}>
          Reviews
        </Text>
        {Array.isArray(user.reviews) && user.reviews.length > 0 ? (
          user.reviews.map((rev) => <Text key={rev}>⭐ {rev}</Text>)
        ) : (
          <Text>No reviews yet.</Text>
        )}
      </View>
    </ScrollView>
  );
}
