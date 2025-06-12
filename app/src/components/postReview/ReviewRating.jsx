// IMPORTS
import { useState } from 'react';
import StarRating from 'react-native-star-rating-widget';
import { Text, View, TouchableOpacity } from "react-native";

// COMPONENTS
import { BeerImage, InfoButtons } from "../beer/Index"

function ReviewRating ( { posting_beer, posting_user_id, submitReview } ) {
    const [rating, setRating] = useState(0)

    function createReview () {
        let review_id = posting_beer.id+"#"+posting_user_id

        const newReview = {
            "id": review_id,
            "type": "rating",
            "user_id": posting_user_id,
            "beer_id": posting_beer.id,
            "title": "",
            "body": "",
            "tags": [],
            "rating": rating,
            "created_at": Date.now(),
            "votes": []
        }
        submitReview(newReview)
    }

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
            <View className="text-white w-32 bg-violet-900 rounded-t-xl ml-6 p-2">
                <Text className="text-white font-bold">Leave a Rating</Text>
            </View>
            <View className="flex w-full bg-yellow-700/80 rounded-xl mb-8 p-4 border border-amber-300/90">
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
                <View className="flex-row justify-center m-5 bg-gray-500 rounded-xl">
                        <StarRating                                                 // Rating                                                 
                            rating={rating}
                            onChange={setRating}
                            enableHalfStar={false}
                            starSize={64}
                        />
                </View>
                <TouchableOpacity                                           // Submit Button
                    onPress={() => { createReview() }}
                    className="flex-row justify-center bg-green-400 rounded-xl px-6 py-6 mx-4 mb-6 hover:bg-green-300"
                >
                    <Text className="text-black text-lg font-bold">Leave Rating</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ReviewRating