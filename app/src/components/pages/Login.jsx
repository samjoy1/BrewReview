import { signInWithEmailAndPassword } from "firebase/auth";
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
import { auth } from "../../../../firebaseconfig";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      alert("Login failed: " + err.message);
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
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Password"
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
            <Button title="Login" onPress={handleLogin} color="#6200ee" />
          </View>
        )}
        <View style={styles.linkButton}>
          <Button
            title="Don't have an account? Sign Up"
            onPress={() => navigation.navigate("SignUp")}
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
