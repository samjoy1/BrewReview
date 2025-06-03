import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Button, FlatList, Text, View } from "react-native";
import { FIRESTORE_DB } from "../../../../firebaseconfig";

export default function Users({ navigation }) {
  const [users, setUsers] = useState([]);
  const [followedUsers, setFollowedUsers] = useState({});

  useEffect(() => {
    getDocs(collection(FIRESTORE_DB, "users"))
      .then((snapshot) => {
        const usersArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(usersArray);
      })
      .catch((err) => console.error(err));
  }, []);

  const toggleFollow = (userId) => {
    setFollowedUsers((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
  };

  return (
    <FlatList
      data={users}
      keyExtractor={(user) => user.id}
      renderItem={({ item: user }) => {
        return (
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
            <Text style={{ marginRight: 12 }}>{user.name}</Text>
            <View style={{ marginRight: 12 }}>
              <Button
                title="View User"
                onPress={() => navigation.navigate("User", { userId: user.id })}
              />
            </View>
            <View>
              <Button
                title={followedUsers[user.id] ? "Unfollow" : "Follow"}
                onPress={() => toggleFollow(user.id)}
              />
            </View>
          </View>
        );
      }}
    />
  );
}
