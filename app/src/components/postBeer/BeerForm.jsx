// IMPORTS
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

// COMPONENTS
import { BeerCardTextBox, SelectBrewery, SelectCategory } from "./index.jsx";

// TAILWIND STYLING
let text_box = "text-white bg-zinc-800 m-1 p-1 rounded-xl h-7 align-middle"
let text_input = "bg-white rounded-xl m-2 p-2 min-h-9"

function BeerForm ({ submitBeer }) {
    const [brewery, setBrewery] = useState({})
    const [category, setCategory] = useState({})

    const [nameInput, setNameInput] = useState("")
    const [countryInput, setCountryInput] = useState("")
    const [percentageInput, setPercentageInput] = useState(0)
    const [logoInput, setLogoInput] = useState("")
    const [imageInput, setImageInput] = useState("")
    const [tags, setTags] = useState([])

    const [titleError, setTitleError] = useState(false)
    const [bodyError, setBodyError] = useState(false)

    // SET FUNCTIONS
    function handleInput (event, inputType) {
        switch (inputType) {
            case "name":
                setNameInput(event)
                break
            case "country":
                setCountryInput(event)
                break
            case "logo":
                setLogoInput(event)
                break
            case "image":
                setImageInput(event)
                break
            case "percentage":
                setPercentageInput(event)
                break
            case "tags":
                setTags(event)
                break
        }
    }

    // UTILITY
    function nameToId (beerName) {
        let modifiedName = beerName.replaceAll(" ", "_")
        return modifiedName.toLowerCase()
    }

    function createBeer () {
        let beer_id = nameToId(nameInput)

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
    }
        if (!nameInput) {
            setTitleError(true)
        }
        submitBeer(newBeer)
    }

    useEffect(() => {
    }, [])

    return (
        
        <View>
            {/* BEER CARD */}
            <View className="text-white w-32 bg-stone-900 rounded-t-xl ml-6 p-2">
                <Text className="text-white">Preview</Text>
            </View>
            <View className="flex-row h-58 w-full bg-yellow-900/90 rounded-xl border border-amber-300/90 mb-6 p-4 shadow-lg">
                
                <View className="flex-1">
                    <BeerCardTextBox text={nameInput} placeholder={"Name"} />
                    <BeerCardTextBox text={category.name} placeholder={"Category"} />
                    <BeerCardTextBox text={brewery.name} placeholder={"Brewery"} />
                    <BeerCardTextBox text={countryInput} placeholder={"Country"} />
                    <BeerCardTextBox text={"Tags"} placeholder={"Tags"} />
                </View>
                <View className="flex-1">
                    <Image source={require("../../../../assets/images/default-beer-image.png")}
                    style={styles.beer_img} className="" />
                </View>
            </View>

            {/* BEER FORM */}
            <View className="text-white w-32 bg-stone-900 rounded-t-xl ml-6 p-2">
                <Text className="text-white">
                    Create a Beer
                </Text>
            </View>
            <View className="w-full bg-stone-900/90 rounded-xl p-8 border border-amber-300/90 shadow-lg">
                <TextInput className={text_input+" min-h-9"}                           // set name
                    placeholder="Enter the name of your beer..."
                    onChangeText={(event) => {handleInput(event, "name")}} />

                <SelectBrewery setBrewery={setBrewery}/>
                <SelectCategory setCategory={setCategory}/>

                <TextInput className={text_input+" min-h-9"}                            // set country
                    placeholder="Enter a country..."
                    editable
                    multiline
                    numberOfLines={1}
                    onChangeText={(event) => {handleInput(event, "country")}}/>

                <TextInput className={text_input+" min-h-9"}                            // set percentage
                    placeholder="Enter a percentage..."
                    editable
                    multiline
                    numberOfLines={1}
                    onChangeText={(event) => {handleInput(event, "percentage")}}/>

                <TextInput className={text_input+" min-h-9 resize-y"}                            // set logo
                    placeholder="Enter a logo..."
                    editable
                    multiline
                    numberOfLines={1}
                    onChangeText={(event) => {handleInput(event, "logo")}}/>

                <TextInput className={text_input+" min-h-9 resize-y"}                            // set image
                    placeholder="Enter an image..."
                    editable
                    multiline
                    numberOfLines={1}
                    onChangeText={(event) => {handleInput(event, "image")}}/>

                <TextInput className={text_input+" min-h-24 resize-y"}                          // add tags
                    placeholder="Add tags..."
                    editable
                    multiline
                    numberOfLines={3}
                    onChangeText={(event) => {handleInput(event, "tags")}}/>

                <TouchableOpacity                                               // Submit Button
                    onPress={() => { createBeer() }}
                    className="flex-row justify-center bg-green-400 rounded-xl px-6 py-6 mx-4 mb-6 mt-3 shadow-sm hover:bg-green-300"
                >
                    <Text className="text-black text-lg font-bold">Submit Beer</Text>
                </TouchableOpacity>                                          
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
  text_input: {
    color: 'black',
    backgroundColor: 'white',
    borderRadius: 6,
    margin: 8,
    padding: 8,
    verticalAlign: "middle"
  },
  text_input_error: {
    color: 'black',
    backgroundColor: 'white',
    border: 'solid',
    borderColor: 'red',
    borderRadius: 6,
    margin: 8,
    padding: 6
  },
  beer_img: {
    width: '85%',
    height: '130',
    borderRadius: '10%',
    marginLeft: 25,
    marginTop: 10
  }
})

export default BeerForm