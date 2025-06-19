import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Button,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { auth, FIRESTORE_DB } from "../../../../firebaseconfig";

export default function SignUp({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!username || !name) {
      alert("Please enter a username and your name.");
      return;
    }
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const uid = userCredential.user.uid;

      // Create user document in Firestore
      await setDoc(doc(FIRESTORE_DB, "users", uid), {
        id: uid,
        email,
        username,
        name,
        avatar_img_url: "https://randomuser.me/api/portraits/men/17.jpg", // default avatar
        country: "",
        created_at: Date.now(),
        followers: [],
        following: [],
        favourite_beers: [],
        favourite_categories: [],
        favourite_tags: [],
        reviews: [],
        phone: null,
        preferences: {
          keepLoggedIn: false,
          sendEmailNotifications: false,
          theme: "light",
        },
      });

      /*navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });*/
    } catch (err) {
      alert("Sign Up failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://i.imgur.com/NcshsBa.png" }}
        style={styles.logo}
      />
      <KeyboardAvoidingView behavior="padding">
        <TextInput
          placeholder="Name"
          placeholderTextColor="#444"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
          style={styles.input}
        />
        <TextInput
          placeholder="Username"
          placeholderTextColor="#444"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          style={styles.input}
        />
        <TextInput
          placeholder="Email"
          placeholderTextColor="#444"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#444"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#6200ee"
            style={{ marginVertical: 20 }}
          />
        ) : (
          <View style={styles.button}>
            <Button title="Sign Up" onPress={handleSignUp} color="#6200ee" />
          </View>
        )}
        <View style={styles.linkButton}>
          <Button
            title="Already have an account? Login"
            onPress={() => navigation.navigate("Login")}
            color="#888"
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#f8f8f8",
  },
  logo: {
    width: 180,
    height: 180,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  button: {
    marginTop: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  linkButton: {
    marginTop: 12,
  },
});
