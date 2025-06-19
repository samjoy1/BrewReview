import { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import StarRating from "react-native-star-rating-widget";

// COMPONENTS
import { BeerImage, InfoButtons } from "../beer/Index";
import SelectTags from "../postReview/SelectTags";

function ReviewForm({ posting_user_id, posting_beer, submitReview }) {
  const [brewery, setBrewery] = useState({});
  const [category, setCategory] = useState({});

  const [titleInput, setTitleInput] = useState("");
  const [bodyInput, setBodyInput] = useState("");
  const [rating, setRating] = useState(0);
  const [tags, setTagsInput] = useState([]);

  const [titleError, setTitleError] = useState(false);
  const [bodyError, setBodyError] = useState(false);

  // SET FUNCTIONS
  function handleInput(event, type) {
    switch (type) {
      case "title":
        setTitleInput(event);
        break;
      case "body":
        setBodyInput(event);
      case "tags":
        setTagsInput(event);
    }
  }

  function addReviewTag(tag) {
    let tagsCopy = [...tags];
    tagsCopy.push(tag);
    setTags(tagsCopy);
  }

  function createReview() {
    let review_id = "";
    if (posting_beer && posting_beer.id) {
      review_id = posting_beer.id + "#" + posting_user_id;
    }

    const newReview = {
      id: review_id,
      type: "review",
      user_id: posting_user_id,
      beer_id: posting_beer.id,
      title: titleInput,
      body: bodyInput,
      tags: tags,
      rating: rating,
      created_at: Date.now(),
      votes: [],
    };
    if (!titleInput) {
      setTitleError(true);
    }
    submitReview(newReview);
  }

    useEffect(() => {
    }, [])

    function handlePressBrewery() {
    }

    function handlePressCountry() {
    }

    function handlePressType() {
    }

    // should go to all beers filtered by high to low rating
    function handlePressRating() {
    }

    return (
        <View>
            {/* BEER CARD */}
            <View className="w-32 bg-violet-900 rounded-t-xl ml-6 p-2">
                <Text className="text-white font-bold">Preview</Text>
            </View>
            <View className="h-58 w-full bg-yellow-700/80 rounded-xl border border-amber-300/90 mb-6 p-4 shadow-lg">
                <BeerImage image={posting_beer.img_url} percentage={posting_beer.percentage}/>
                    <InfoButtons
                        type={posting_beer.category}
                        country={posting_beer.country}
                        rating={posting_beer.rating}
                        brewery={posting_beer.brewery}
                        onTypeButtonPress={handlePressType}
                        onCountryButtonPress={handlePressCountry}
                        onRatingButtonPress={handlePressRating}
                        onBreweryButtonPress={handlePressBrewery}
                    />
                    {/* <View className="bg-gray-500 w-full h-8">
                        { posting_beer.tags.forEach((tag) => {
                        return ( <View className="bg-stone-900 w-16 h-16">
                            <Text className="text-black font-bold">{tag}</Text>
                        </View> )
                        })}
                    </View> */}
                
                {/* <View className="flex-1">
                    <BeerCardTextBox text={posting_beer ? posting_beer.name : ""} placeholder={"Name"} />
                    <BeerCardTextBox text={posting_beer ? posting_beer.category : ""} placeholder={"Category"} />
                    <BeerCardTextBox text={posting_beer ? posting_beer.brewery: ""} placeholder={"Brewery"} />
                    <BeerCardTextBox text={posting_beer ? posting_beer.country: ""} placeholder={"Country"} />
                    <BeerCardTextBox text={"tags"} placeholder={"Tags"} />
                </View> */}
            </View>

            <View className="w-32 bg-violet-900 rounded-t-xl ml-6 p-2">
                <Text className="text-white font-bold">Write a Review</Text>
            </View>
            <View className="w-full bg-stone-900/80 rounded-xl p-4 border border-amber-300/90">
                <TextInput style={styles.text_input}                            // set title
                    placeholder="Enter a title for your review..."
                    onChangeText={(event) => { handleInput(event, "title")}} />

                <TextInput style={styles.text_input}                            // set body
                    placeholder="Enter your review..."
                    editable
                    multiline
                    numberOfLines={8}
                    onChangeText={(event) => { handleInput(event, "body")}}/>

                <SelectTags addReviewTag={addReviewTag}/>

                <View className="flex-row justify-center m-5 bg-gray-500 rounded-xl">
                    <StarRating                                                 // Rating                                                 
                        rating={rating}
                        onChange={setRating}
                        enableHalfStar={false}
                        starSize={40}
                    />
                </View> 
                
                <TouchableOpacity                                               // Submit Button
                    onPress={() => { createReview() }}
                    className="flex-row justify-center bg-green-400 rounded-xl px-6 py-6 mx-4 mb-6 shadow-sm hover:bg-green-300"
                >
                    <Text className="text-black text-lg font-bold">Submit Review</Text>
                </TouchableOpacity>                                          
            </View>
        </View>
  );
}

const styles = StyleSheet.create({
  text_input: {
    color: "black",
    backgroundColor: "white",
    borderRadius: 6,
    margin: 8,
    padding: 8,
  },
  text_input_error: {
    color: "black",
    backgroundColor: "white",
    border: "solid",
    borderColor: "red",
    borderRadius: 6,
    margin: 8,
    padding: 6,
  },
  beer_img: {
    width: "85%",
    height: "130",
    borderRadius: "10%",
    marginLeft: 25,
    marginTop: 10,
  },
});

export default ReviewForm;
