import { Image, Text, View } from "react-native";

// BLOCKERS
// not able to get dynamic info from database until it is populated

// TO DO
// 1 - need to update it so that the params from when the user clicks on a beer can be used to direct them to the correct beer card
// 2 - image needs to dynamically get the url from the firebase database

function BeerCard() {
  // placeholder data, to be replaced once databases have all required info
  const name = "Awesome Brew";
  const image =
    "https://imgs.search.brave.com/HTnfzB4GPTeNE42Sm6aAH116T7QcNedDW2gE4mTiaks/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvNTQ1/ODY0NTU5L3Bob3Rv/L3VzYS1uZXctamVy/c2V5LWhhbmQtcG91/cmluZy1iZWVyLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz1F/Y0R2MXRqbjM1eEJt/amtUR0dkMmRTYk9P/eWZ1U0dTSWhlNUtM/bE5xSjFVPQ";
  const type = "IPA";
  const country = "Germany";
  const rating = 4.5;
  const brewery = "Berlin Brewery";

  return (
    <View className="p-4 bg-gray-100 min-h-screen">
      <Text className="text-xl font-bold">
        I am a beer card and I am working
      </Text>
      // image
      <View className="w-full h-48 rounded-xl overflow-hidden mb-4">
        <Image
          source={{
            uri: image,
          }}
          className="w-full h-full"
          resizeMode="contain"
        />
      </View>
      // name
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-xl font-bold">{name}</Text>
      </View>
      // type
      <View>
        <Text className="text-xl font-bold">{type}</Text>
      </View>
      // country
      <View>
        <Text className="text-xl font-bold">{country}</Text>
      </View>
      // rating
      <View>
        <Text className="text-xl font-bold">{rating}</Text>
      </View>
      // brewery
      <View>
        <Text className="text-xl font-bold">{brewery}</Text>
      </View>
      // reviews
      <View>
        <Text>Maybe a drop down that shows associated reviews</Text>
      </View>
    </View>
  );
}

export default BeerCard;
