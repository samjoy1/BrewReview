import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { doc, getDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "../../../../firebaseconfig";

export default function User({ route }) {
  const { userId } = route.params;
  const [user, setUser] = useState(null);

  useEffect(() => {
    getDoc(doc(FIRESTORE_DB, "users", userId))
      .then((docSnap) => {
        if (docSnap.exists()) {
          setUser({ id: docSnap.id, ...docSnap.data() });
        }
      })
      .catch((err) => console.error(err));
  }, [userId]);

  if (!user) return null;

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      {Object.entries(user).map(([field, value]) => (
        <View key={field} style={{ marginBottom: 12 }}>
          <Text>{field}: {String(value)}</Text>
        </View>
      ))}
    </ScrollView>
  );
}