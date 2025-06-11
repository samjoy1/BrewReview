// IMPORTS
import { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// COMPONENTS
import { BeerCardTextBox, SelectBrewery, SelectCategory } from "./index.jsx";

// TAILWIND STYLING
let text_box = "text-white bg-zinc-800 m-1 p-1 rounded-xl h-7 align-middle";
let text_input = "bg-white rounded-xl m-2 p-2 min-h-9";

const { width: screenWidth } = Dimensions.get("window");

function BeerForm({ submitBeer }) {
  const [brewery, setBrewery] = useState({});
  const [category, setCategory] = useState({});

  const [nameInput, setNameInput] = useState("");
  const [countryInput, setCountryInput] = useState("");
  const [percentageInput, setPercentageInput] = useState(0);
  const [logoInput, setLogoInput] = useState("");
  const [imageInput, setImageInput] = useState("");
  const [tags, setTags] = useState([]);

  const [titleError, setTitleError] = useState(false);
  const [bodyError, setBodyError] = useState(false);

  // SET FUNCTIONS
  function handleInput(event, inputType) {
    switch (inputType) {
      case "name":
        setNameInput(event);
        break;
      case "country":
        setCountryInput(event);
        break;
      case "logo":
        setLogoInput(event);
        break;
      case "image":
        setImageInput(event);
        break;
      case "percentage":
        setPercentageInput(event);
        break;
      case "tags":
        setTags(event);
        break;
    }
  }

  // UTILITY
  function nameToId(beerName) {
    let modifiedName = beerName.replaceAll(" ", "_");
    return modifiedName.toLowerCase();
  }

  function createBeer() {
    let beer_id = nameToId(nameInput);

    const newBeer = {
      id: beer_id,
      name: nameInput,
      country: countryInput,
      category: category.id,
      brewery: brewery.id,
      logo_url: logoInput,
      img_url: imageInput,
      percentage: percentageInput,
      tags: [],
      reviews: [],
    };
    if (!nameInput) {
      setTitleError(true);
    }
    submitBeer(newBeer);
  }

  useEffect(() => {}, []);

  return (
    <View style={styles.container}>
      {/* BEER CARD PREVIEW */}
      <View className="text-white w-32 bg-stone-900 rounded-t-xl ml-6 p-2">
        <Text>Preview</Text>
      </View>

      {/* Main Beer Card Container */}
      <View style={styles.beerCard} className="flex-row mb-6 p-4 shadow-lg">
        <View style={styles.beerCardLeftColumn}>
          <BeerCardTextBox
            text={nameInput}
            placeholder={"Name"}
            className={text_box}
          />
          <BeerCardTextBox
            text={category.name}
            placeholder={"Category"}
            className={text_box}
          />
          <BeerCardTextBox
            text={brewery.name}
            placeholder={"Brewery"}
            className={text_box}
          />
          <BeerCardTextBox
            text={countryInput}
            placeholder={"Country"}
            className={text_box}
          />
          <BeerCardTextBox
            text={"tags"}
            placeholder={"Tags"}
            className={text_box}
          />
        </View>

        <View style={styles.beerCardRightColumn}>
          <Image
            source={require("../../../../assets/images/default-beer-image.png")}
            style={styles.beer_img}
            resizeMode="contain"
          />
        </View>
      </View>

      {/* BEER FORM INPUTS */}
      <View className="text-white w-32 bg-stone-900 rounded-t-xl ml-6 p-2">
        <Text>Create a Beer</Text>
      </View>
      <View className="w-full bg-stone-900/90 rounded-xl p-8 border border-amber-300/90 shadow-lg">
        <TextInput
          style={styles.textInputCommon}
          placeholder="Enter the name of your beer..."
          onChangeText={(event) => {
            handleInput(event, "name");
          }}
        />

        <SelectBrewery setBrewery={setBrewery} />
        <SelectCategory setCategory={setCategory} />

        <TextInput
          style={styles.textInputCommon}
          placeholder="Enter a country..."
          editable
          multiline
          numberOfLines={1}
          onChangeText={(event) => {
            handleInput(event, "country");
          }}
        />

        <TextInput
          style={styles.textInputCommon}
          placeholder="Enter a percentage..."
          editable
          multiline
          numberOfLines={1}
          onChangeText={(event) => {
            handleInput(event, "percentage");
          }}
        />

        <TextInput
          style={styles.textInputCommon}
          placeholder="Enter a logo..."
          editable
          multiline
          numberOfLines={1}
          onChangeText={(event) => {
            handleInput(event, "logo");
          }}
        />

        <TextInput
          style={styles.textInputCommon}
          placeholder="Enter an image..."
          editable
          multiline
          numberOfLines={1}
          onChangeText={(event) => {
            handleInput(event, "image");
          }}
        />

        <TextInput
          style={[styles.textInputCommon, styles.tagsInput]}
          placeholder="Add tags (comma separated)..."
          editable
          multiline
          numberOfLines={3}
          onChangeText={(event) => {
            handleInput(event, "tags");
          }}
        />

        {/* Submit Button */}
        <TouchableOpacity
          onPress={() => {
            createBeer();
          }}
          className="flex-row justify-center bg-green-400 rounded-xl px-6 py-6 mx-4 mb-6 mt-3 shadow-sm hover:bg-green-300"
        >
          <Text className="text-black text-lg font-bold">Submit Beer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  textInputCommon: {
    color: "black",
    backgroundColor: "white",
    borderRadius: 6,
    marginVertical: 8,
    padding: 8,
    minHeight: 36,
  },
  tagsInput: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  text_input_error: {
    color: "black",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 6,
    margin: 8,
    padding: 6,
  },
  beer_img: {
    width: screenWidth * 0.35,
    height: screenWidth * 0.35,
    borderRadius: 5,
  },
  beerCard: {
    flexDirection: "row",
    height: 232,
    width: "100%",
    backgroundColor: "rgba(139, 69, 19, 0.9)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(251, 202, 38, 0.9)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  beerCardLeftColumn: {
    flex: 1,
    marginRight: 10,
    justifyContent: "space-around",
  },
  beerCardRightColumn: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default BeerForm;
