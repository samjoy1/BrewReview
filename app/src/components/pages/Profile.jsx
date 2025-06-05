import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Avatar, Icon } from "react-native-elements";
function Profile({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="settings" type="feather" color="#000" />
        </TouchableOpacity>
        <View style={styles.avatarContainer}>
          <Avatar
            rounded
            size="large"
            icon={{ name: "user", type: "feather" }}
            containerStyle={styles.avatar}
          />
          <Text style={styles.username}>Manu G C</Text>
          <View style={styles.statsContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate("FollowersPage")}
            >
              <Text style={styles.linkText}>0 followers</Text>
            </TouchableOpacity>
            <Text style={styles.dotSeparator}> · </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("FollowingPage")}
            >
              <Text style={styles.linkText}>0 following</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Sections */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("FavouriteBeers")}
      >
        <Text>Favourite beers</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("RecentReviews")}
      >
        <Text>Your most recent reviews</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("TasteProfile")}
      >
        <Text>Your taste profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#d7e6f6" },
  header: { padding: 20, alignItems: "center", backgroundColor: "#d7e6f6" },
  avatarContainer: { alignItems: "center", marginTop: 10 },
  avatar: { backgroundColor: "#ccc" },
  username: { fontSize: 14, fontWeight: "bold", marginTop: 10 },
  stats: { fontSize: 14, color: "#666" },
  sectionList: { padding: 20 },
  sectionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc",
  },
  button: {
    width: "100%",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginVertical: 8,
    borderWidth: 1,
    alignItems: "center",
  },
  halfButton: {
    width: "48%",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
  },
  largeBox: {
    width: "100%",
    height: 100,
    borderWidth: 1,
    borderRadius: 8,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  statsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  linkText: {
    color: "#007AFF",
    fontWeight: "500",
  },
  dotSeparator: {
    marginHorizontal: 5,
    color: "#555",
  },
});

export default Profile;
