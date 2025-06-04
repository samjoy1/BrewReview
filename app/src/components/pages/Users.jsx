import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { FIRESTORE_DB } from "../../../../firebaseconfig";

function Users({ navigation }) {
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

  //once Auth is set up this button will add/remove the user from the followers list
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
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 8,
              padding: 16,
            }}
          >
            {/* avatar circle icon  */}
            {user.avatar_img_url ? (
              <Image
                source={{ uri: user.avatar_img_url }}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  marginRight: 12
                }}
              />
            ) : (
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: "lightgrey",
                  marginRight: 12
                }}
              ></View>
            )}
            {/* username  */}
            <Text style={{ flex: 1 }}>{user.name}</Text>

            {/* view user button  */}
            <View style={{ marginRight: 12 }}>
              <TouchableOpacity
                style={{
                  backgroundColor: "lightblue",
                  padding: 4,
                  borderRadius: 4,
                }}
                onPress={() => navigation.navigate("User", { userId: user.id })}
              >
                <Text>View User</Text>
              </TouchableOpacity>
            </View>

            {/* follow/unfollow button  */}
            <View>
              <TouchableOpacity
                style={{
                  backgroundColor: followedUsers[user.id]
                    ? "#FF3B30"
                    : "#3B82F6",
                  padding: 4,
                  borderRadius: 4,
                }}
                onPress={() => toggleFollow(user.id)}
              >
                <Text>{followedUsers[user.id] ? "Unfollow" : "Follow"}</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      }}
    />
  );
}

export default Users;
