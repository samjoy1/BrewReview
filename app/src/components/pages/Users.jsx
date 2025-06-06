import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDoc, getDocs, arrayRemove, arrayUnion, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../../../firebaseconfig";

function Users({ route, navigation }) {
  const [users, setUsers] = useState([]);
  const [followedUsers, setFollowedUsers] = useState({});
  const [currentUser, setCurrentUser] = useState(null);

//track logged in users
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    //if route is provided
    const ids = route?.params?.userIds || null;
    if (Array.isArray(ids)) {
      Promise.all(
        ids.map((uid) =>
          getDoc(doc(FIRESTORE_DB, "users", uid)).then((snap) =>
            snap.exists() ? { id: snap.id, ...snap.data() } : null
          )
        )
      )
        .then((results) => setUsers(results.filter((r) => r)))
        .catch((err) => console.error(err));
      return;
    }

    getDocs(collection(FIRESTORE_DB, "users"))
      .then((snapshot) => {
        const usersArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(usersArray);
      })
      .catch((err) => console.error(err));
  }, [route?.params?.userIds]);

  //adds and removes users from follow list
  const toggleFollow = (targetUserId) => {
    if (!currentUser || currentUser.uid === targetUserId) return;
  
    const currentRef = doc(FIRESTORE_DB, "users", currentUser.uid);
    const targetRef = doc(FIRESTORE_DB, "users", targetUserId);
  
    const isFollowing = followedUsers[targetUserId];
  
    updateDoc(currentRef, {
      following: isFollowing ? arrayRemove(targetUserId) : arrayUnion(targetUserId),
    }).catch((err) => console.error(err));
  
    updateDoc(targetRef, {
      followers: isFollowing ? arrayRemove(currentUser.uid) : arrayUnion(currentUser.uid),
    }).catch((err) => console.error(err));
  
    setFollowedUsers((prev) => ({
      ...prev,
      [targetUserId]: !isFollowing,
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
                  marginRight: 12,
                }}
              />
            ) : (
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: "lightgrey",
                  marginRight: 12,
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
