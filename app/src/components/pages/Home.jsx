import { Button } from "@react-navigation/elements";
import { Text, View } from "react-native";

function Home({ navigation }) {
  return (
    <View>
      <Button
        onPress={() => {
          navigation.navigate("Beer");
        }}
      >
        <Text>Goodbye</Text>
      </Button>

      <Button
        onPress={() => {
          navigation.navigate("BeerList");
        }}
      >
        <Text>List of beers</Text>
      </Button>
    </View>
  );
}

export default Home;
